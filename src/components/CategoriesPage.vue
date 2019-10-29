<template>

    <div class="category-page">

        <section class="subcategory">
            <ul>
                <li :class="{'active': subCategoryId == 1}">
                    <a @click="filterBySubCategory(1)">
                        <span class="icon icon-snack"></span>
                        <span class="text">Галеты</span>
                    </a>
                </li>
                <li :class="{'active': subCategoryId == 2}">
                    <a @click="filterBySubCategory(2)">
                        <span class="icon icon-mix"></span>
                        <span class="text">Моно и овощние смеси</span>
                    </a>
                </li>
                <li :class="{'active': subCategoryId == 3}">
                    <a @click="filterBySubCategory(3)">
                        <span class="icon icon-food"></span>
                        <span class="text">Готовые блюда</span>
                    </a>
                </li>
                <li :class="{'active': subCategoryId == 4}">
                    <a @click="filterBySubCategory(4)">
                        <span class="icon icon-barbecue"></span>
                        <span class="text">Овощи-гриль</span>
                    </a>
                </li>
            </ul>

        </section>

        <section class="items">
            <ul>
                <li v-for="(product, productIndex) in subCategoryProduct" :key="productIndex">
                    <!-- Block recept -->
                    <div v-if="productIndex == 3" class="recept-block">

                        <div>
                            <div class="recept-block-title">
                                <div class="recept-block-title-corner"></div>
                                <div class="recept-block-title-wrapper">
                                    {{product.title}}
                                </div>
                            </div>
                            <div>
                                <img src="../assets/picture.png"/>
                            </div>
                        </div>

                        <div  class="recept-block-text">
                            <div class="recept-block-text-title2">{{product.title2}}</div>
                            <div class="recept-block-text-spliter"></div>
                            <div class="recept-block-text-title3">{{product.text}}</div>
                        </div>
                    </div>
                    <!-- / Block recept -->
                    <!-- Other items -->
                    <div v-else>

                        <div class="image">

                            <div class="product-new" v-if="product.new == 1">
                                New
                            </div>
                            <div class="product-no-new" v-else></div>

                            <div class="product-image">
                                <img src="../assets/box.png" :title="product.name" v-if="product.image == 'dump.jpg'"/>
                                <img :src="product.image" :title="product.name" v-else/>
                            </div>
                        </div>

                        <div class="weights">
                            <div v-for="(weight, weightIndex) in product.weights"
                                 :key="productIndex + '-w' + weightIndex"
                                 :class="{'active': weightIndex == 0, 'no-active': weightIndex != 0}"
                                 :ref="'product' + productIndex + 'weight'"
                                 @click="changeWeight('product' + productIndex + 'weight', weightIndex, weight.price )"
                            >
                                {{weight.weight}} г
                            </div>
                        </div>

                        <div class="price">
                            <div class="price-text" :ref="'product' + productIndex + 'weight-price'">
                                {{showPrice(product.weights[0].price)}}
                            </div>
                        </div>

                        <div class="buy">
                            <button @click="goToLink(product.link)">Купить</button>
                        </div>

                        <div class="rating">
                            <div v-for="(rating,  ratingIndex) in 5" :key="productIndex + '-r' + ratingIndex">
                                <img src="../assets/icons/star-full.png" alt="" v-if="Math.round(product.rating) >= rating"/>
                                <img src="../assets/icons/star-empty.png" alt="" v-else/>
                            </div>
                        </div>
                    </div>
                    <!-- / Other items -->
                </li>
            </ul>
        </section>

    </div>

</template>

<script>

    import axios from 'axios'

    export default {

        name: 'CategoriesPage',

        data () {
            return {
                subCategoryId: null,
                products: []
            }
        },

        computed: {
            subCategoryProduct: function () {
                let products = this.products.filter( val => {
                    if (this.subCategoryId === null) return true
                    return val.subcategory_code == this.subCategoryId
                }).sort((a, b) => a.sort - b.sort)

                if (products.length > 3) {
                    products.splice(3, 0, {
                        title: 'Рецепт дня',
                        title2: 'Крабовый салат с кукурузой и кукурузной заправкой',
                        text: 'Полезные и доступные продукты являются эталоном качества с советских времен. Консервированные овощи'
                    });
                }

                return products
            }
        },

        mounted() {
            axios.get('products.json').then( response => {
                this.products = response.data.data.products
            })
        },

        methods: {

            changeWeight(ref, weightIndex, weightPrice) {
                this.$refs[ref].forEach(weight => weight.className = 'no-active');
                this.$refs[ref][weightIndex].className = "active"
                this.$refs[ref + '-price'][0].innerText = this.showPrice(weightPrice)
            },

            filterBySubCategory(subCategoryId) {
                this.subCategoryId = subCategoryId
            },

            goToLink(link) {
                window.location = link;
            },

            showPrice(price) {
                if (price) {
                    return price + ' Р'
                } else {
                    return ' -- '
                }
            }
        }
    }

</script>

<style>

</style>
