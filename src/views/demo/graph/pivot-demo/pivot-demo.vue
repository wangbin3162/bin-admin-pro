<template>
  <page-wrapper title="Pivot Table" desc="交叉表，根据不同配置动态获取不同的表格显示。">
    <!--    <b-collapse-wrap title="FieldLabel" shadow="none">-->
    <!--      <div class="p16">-->
    <!--        <field-label>test</field-label>-->
    <!--      </div>-->
    <!--    </b-collapse-wrap>-->
    <b-collapse-wrap title="Pivot (drag & drop UI + PivotTable)" shadow="none">
      <div class="p16" style="--bin-border-base-radius: 0;">
        <pivot
          :data="data"
          :fields="fields"
          :available-field-keys="availableFieldKeys"
          :row-field-keys="rowFieldKeys"
          :col-field-keys="colFieldKeys"
          :reducer="reducer"
        >
          <template #genderHeader="{ value }">
            <svg v-if="value === 'female'" aria-hidden="true" data-prefix="fas" data-icon="venus" role="img"
                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 288 512" class="svg-inline--fa fa-venus fa-fw"
                 style="width: 15px;height: 15px;position: relative;top:2px;">
              <path fill="currentColor"
                    d="M288 176c0-79.5-64.5-144-144-144S0 96.5 0 176c0 68.5 47.9 125.9 112 140.4V368H76c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h36v36c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12v-36h36c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-36v-51.6c64.1-14.5 112-71.9 112-140.4zm-224 0c0-44.1 35.9-80 80-80s80 35.9 80 80-35.9 80-80 80-80-35.9-80-80z"
                    class=""></path>
            </svg>
            <svg v-else-if="value === 'male'" aria-hidden="true" data-prefix="fas" data-icon="mars" role="img"
                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="svg-inline--fa fa-mars fa-fw"
                 style="width: 15px;height: 15px;position: relative;top:2px;">
              <path fill="currentColor"
                    d="M372 64h-79c-10.7 0-16 12.9-8.5 20.5l16.9 16.9-80.7 80.7c-22.2-14-48.5-22.1-76.7-22.1C64.5 160 0 224.5 0 304s64.5 144 144 144 144-64.5 144-144c0-28.2-8.1-54.5-22.1-76.7l80.7-80.7 16.9 16.9c7.6 7.6 20.5 2.2 20.5-8.5V76c0-6.6-5.4-12-12-12zM144 384c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"
                    class=""></path>
            </svg>
            {{ value }}
          </template>
        </pivot>
      </div>
      <!--      <div flex="box:mean">-->
      <!--        <b-ace-editor :model-value="JSON.stringify(data,null,2)"></b-ace-editor>-->
      <!--        <b-ace-editor :model-value="JSON.stringify(fields,null,2)"></b-ace-editor>-->
      <!--      </div>-->
    </b-collapse-wrap>
  </page-wrapper>
</template>

<script>
import PageWrapper from '@/components/Common/Page/page-wrapper.vue'
import FieldLabel from '@/components/Common/PivotTable/field-label.vue'
import Pivot from '@/components/Common/PivotTable/pivot.vue'
import data from './data'
import dataGdp from './data-gdp'

const dataGdpFlattened = []
dataGdp.forEach(item => {
  dataGdpFlattened.push({ country: item.country, year: item.year, type: 'count', count: item.count })
  dataGdpFlattened.push({ country: item.country, year: item.year, type: 'gdp', gdp: item.gdp })
})

export default {
  name: 'PivotDemo',
  components: { Pivot, PageWrapper },
  data() {
    return {
      data,
      asyncData: [],
      dataGdpFlattened,
      // Pivot params
      fields: [
        {
          key: 'country',
          getter: item => item.country,
          label: 'Country',
          headers: [
            { slotName: 'countryFlagHeader', label: 'Flag', checked: true },
            { slotName: 'countryNameHeader', label: 'Name', checked: true },
          ],
          headerAttributeFilter: true,
          valueFilter: true,
        },
        {
          key: 'gender',
          getter: item => item.gender,
          label: 'Gender',
          headerSlotName: 'genderHeader',
          valueFilter: true,
          valueFilterSlotName: 'genderHeader', // value值过滤插槽名称
        },
        {
          key: 'year',
          getter: item => item.year,
          label: 'Year',
          valueFilter: true,
        },
      ],
      availableFieldKeys: [],
      rowFieldKeys: ['country', 'gender'],
      colFieldKeys: ['year'],
      reducer: (acc, item) => acc + item.count,
      defaultShowSettings: true,
      isDataLoading: false,
    }
  },
  methods: {
    countryCode(country) {
      switch (country) {
        case 'Australia':
          return 'au'
        case 'China':
          return 'cn'
        case 'France':
          return 'fr'
        case 'India':
          return 'in'
        case 'United States':
          return 'us'
      }
    },
    countryEmoji(country) {
      const countryCode = this.countryCode(country)
      const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt())
      return String.fromCodePoint(...codePoints)
    },
  },
}
</script>
