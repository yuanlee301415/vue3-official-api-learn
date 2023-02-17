<template>
  <div class="grid">
    <table>
      <thead>
        <th
          v-for="({ field, title, sort }, idx) of columns"
          :key="field"
          :class="{ active: field === activeName, sort }"
          :style="{ width: 100 / columns.length + '%' }"
          @click="handleClickHead(field, idx, sort)"
        >
          {{ title }}
          <span
            v-if="sort"
            :class="{
              'arrow-asc': sortOrders[idx] === ORDER_ASC,
              'arrow-dsc': sortOrders[idx] === ORDER_DSC,
            }"
            class="arrow"
          ></span>
        </th>
      </thead>
      <tbody v-if="filteredData && filteredData.length">
        <tr v-for="(item, idx) of filteredData" :key="idx">
          <td v-for="{ field } of columns" :key="field">
            {{ item[field] }}
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td :colspan="columns.length">
            <div class="noData">No data.</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";

const props = defineProps<{
  data: any[];
  columns: { field: string; title: string; sort?: boolean }[];
  filterKey?: string;
}>();

const ORDER_ASC = 1; // 升序
const ORDER_DSC = -1; // 降序
const activeName = ref("");
const sortOrders = reactive(props.columns.map(() => ORDER_ASC));

// Todo: 单击未配置排序功能的表头后，数据会重置为初始顺序
const filteredData = computed(() => {
  const { data, filterKey, columns } = props;
  const ret = data.filter((item) =>
    filterKey
      ? columns.some(({ field }) =>
          String(item[field]).toLowerCase().includes(filterKey!.toLowerCase())
        )
      : true
  );
  const columnIdx = columns.findIndex(
    ({ field }) => field === activeName.value
  );
  const column = columns[columnIdx];

  if (!column || !column.sort) return ret;

  const order = sortOrders[columnIdx];
  ret.sort(
    (a, b) =>
      order *
      String(a[activeName.value]).localeCompare(String(b[activeName.value]))
  );
  return ret;
});

function handleClickHead(name: string, idx: number, sort?: boolean) {
  activeName.value = name;
  sort && toggleSort(name, idx);
}

function toggleSort(name: string, idx: number) {
  const order = sortOrders[idx];
  sortOrders[idx] = Number(-order);
}
</script>

<style scoped lang="less">
@arrow-size: 8px;
.grid {
  border: 2px solid #6c6;

  table {
    width: 100%;

    thead {
      th {
        line-height: 2.5;
        background-color: #6c6;
        color: #fff;
        text-align: center;
        opacity: 0.8;
        &.sort {
          cursor: pointer;
        }
        &.active {
          opacity: 1;
        }
      }
    }

    tbody {
      tr {
        td {
          background-color: #ddd;
          line-height: 2;
          text-indent: 1em;
        }
        &:hover td {
          background-color: #fff !important;
        }
        &:nth-child(2n) td {
          background-color: #eee;
        }
      }
    }
  }

  .arrow {
    display: inline-block;
    width: 0;
    height: 0;
    overflow: hidden;

    &.arrow-asc {
      border-bottom: @arrow-size solid #fff;
      border-left: @arrow-size solid transparent;
      border-right: @arrow-size solid transparent;
    }

    &.arrow-dsc {
      border-top: @arrow-size solid #fff;
      border-left: @arrow-size solid transparent;
      border-right: @arrow-size solid transparent;
    }
  }

  .noData {
    text-align: center;
    opacity: 0.6;
  }
}
</style>
