<!-- @format -->
<script setup>
import { useCategoryStore } from '@/stores/category';
import { storeToRefs } from 'pinia';
const categoryStore = useCategoryStore();
const { categoryList } = storeToRefs(categoryStore);
</script>
<template>
  <div class="home-category">
    <ul class="menu">
      <li v-for="category in categoryList" :key="category.id">
        <router-link to="/">{{ category.name }}</router-link>
        <router-link to="/" v-for="item in category.children.slice(0, 2)" :key="item.id">
          {{ item.name }}
        </router-link>
        <div class="layer">
          <h4>
            分类推荐
            <small>根据您的购买或浏览记录推荐</small>
          </h4>
          <ul>
            <li v-for="goods in category.goods" :key="goods.id">
              <router-link to="/">
                <img :src="goods.picture" alt="" />
                <div class="info">
                  <p class="name ellipsis-2">{{ goods.name }}</p>
                  <p class="desc ellipsis">{{ goods.desc }}</p>
                  <p class="price">
                    <i>¥</i>
                    {{ goods.price }}
                  </p>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.home-category {
  position: relative;
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);

  .menu {
    li {
      width: 100%;
      padding-left: 40px;
      height: 55px;
      line-height: 55px;

      &:hover {
        background: $xtxColor;
      }

      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }

      .layer {
        display: none;
        position: absolute;
        width: 990px;
        height: 500px;
        left: 250px;
        top: 0;
        background: hsla(0, 0%, 100%, 0.8);
        padding: 0 15px;

        h4 {
          font-size: 20px;
          font-weight: normal;
          line-height: 80px;

          small {
            font-size: 16px;
            color: #666;
          }
        }
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            width: 300px;
            height: 120px;
            margin-right: 15px;
            margin-bottom: 15px;
            border: 1px solid #eee;
            border-radius: 4px;
            background: #fff;

            &:nth-child(3) {
              margin-right: 0;
            }
          }
          a {
            display: flex;
            width: 100%;
            height: 100%;
            align-items: center;
            padding: 10px;

            &:hover {
              background: #e3f9f4;
            }

            img {
              width: 95px;
              height: 95px;
            }
            .info {
              padding-left: 10px;
              line-height: 24px;
              overflow: hidden;
              .name {
                font-size: 16px;
                color: #666;
              }

              .desc {
                color: #999;
              }

              .price {
                font-size: 22px;
                color: $priceColor;
                i {
                  font-size: 16px;
                }
              }
            }
          }
        }
      }
      &:hover {
        .layer {
          display: block;
        }
      }
    }
  }
}
</style>
