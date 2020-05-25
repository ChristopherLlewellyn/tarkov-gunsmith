<template>
  <v-container>
    <v-layout row wrap>
      <v-flex md12>
        <v-card color="grey darken-4">
          <v-card-title class="blue-grey darken-2 justify-center">
            <v-icon class="pr-2" large>mdi-hammer-wrench</v-icon>Build List
          </v-card-title>
          <v-container fluid>
            <v-toolbar flat>
              <v-text-field
                v-model="search"
                prepend-icon="mdi-magnify"
                label="Filter"
                class="pb-2 pt-2"
                single-line
                hide-details
                clearable
              ></v-text-field>
            </v-toolbar>

            <v-data-table
              :headers="headers"
              :items="items"
              :search="search"
              :items-per-page="-1"
              class="elevation-1"
            >
              <template v-slot:body="{ items }">
                <tbody>
                  <tr v-for="item in items" :key="item.id + guid()">
                    <!-- Image -->
                    <td>
                      <template v-if="item.kind != 'firearm'">
                        <attachment-image
                          :imgUrl="item.img"
                          :name="item.name"
                          :ergonomicsModifier="item.ergonomics_modifier"
                          :recoilModifier="item.recoil_modifier"
                          :weight="item.weight"
                          :marketPrice="item.avg_24h_price"
                          :traderName="item.trader_name"
                          :traderPrice="item.trader_price"
                          :traderCurrency="item.trader_price_cur"
                        ></attachment-image>
                      </template>

                      <template v-else-if="item.kind == 'firearm'">
                        <weapon-image
                          :imgUrl="item.img"
                          :name="item.name"
                          :ergonomics="item.ergonomics"
                          :verticalRecoil="item.vertical_recoil"
                          :horizontalRecoil="item.horizontal_recoil"
                          :weight="item.weight"
                          :marketPrice="item.avg_24h_price"
                          :traderName="item.trader_name"
                          :traderPrice="item.trader_price"
                          :traderCurrency="item.trader_price_cur"
                        ></weapon-image>
                      </template>
                    </td>

                    <!-- Short Name -->
                    <td>
                      <span>{{ item.short_name }}</span>
                    </td>

                    <!-- Full Name -->
                    <td>
                      <span>{{ item.name }}</span>
                    </td>

                    <!-- Flea Market Price -->
                    <td>
                      <price-chip :value="item.avg_24h_price ? item.avg_24h_price : 0" currency="₽" source="Flea Market"></price-chip>
                    </td>

                    <!-- Trader Portrait -->
                    <td>
                      <template>
                        <trader-portrait :traderName="item.trader_name ? item.trader_name : null"></trader-portrait>
                      </template>
                    </td>

                    <!-- Trader Price -->
                    <td>
                      <template>
                        <price-chip
                          :value="item.trader_price ? item.trader_price : 0"
                          :currency="item.trader_price_cur ? item.trader_price_cur : '?'"
                          source="Trader"
                        ></price-chip>
                      </template>
                    </td>

                    <!-- Ergo -->
                    <td>
                      <template v-if="item.ergonomics_modifier">
                        <ergonomics-chip :value="item.ergonomics_modifier"></ergonomics-chip>
                      </template>

                      <template v-else-if="item.ergonomics">
                        <ergonomics-chip :value="item.ergonomics"></ergonomics-chip>
                      </template>

                      <template v-else>
                        <span>-</span>
                      </template>
                    </td>

                    <!-- Recoil -->
                    <td>
                      <template v-if="item.recoil_modifier">
                        <recoil-modifier-chip :value="item.recoil_modifier"></recoil-modifier-chip>
                      </template>

                      <template v-else-if="item.horizontal_recoil && item.vertical_recoil">
                        <vertical-recoil-chip :value="item.vertical_recoil"></vertical-recoil-chip>
                        <horizontal-recoil-chip :value="item.horizontal_recoil"></horizontal-recoil-chip>
                      </template>

                      <template v-else>
                        <span>-</span>
                      </template>
                    </td>

                    <!-- Weight -->
                    <td>
                      <weight-chip :value="item.weight"></weight-chip>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-data-table>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ErgonomicsChip from "./ErgonomicsChip";
import HorizontalRecoilChip from "./HorizontalRecoilChip";
import VerticalRecoilChip from "./VerticalRecoilChip";
import RecoilModifierChip from "./RecoilModifierChip";
import WeightChip from "./WeightChip";
import PriceChip from "./PriceChip";
import TraderPriceCard from "./TraderPriceCard";
import MarketPriceCard from "./MarketPriceCard";
import AttachmentImage from "./AttachmentImage";
import WeaponImage from "./WeaponImage";
import TraderPortrait from "./TraderPortrait";

export default {
  name: "buildListTable",
  props: {
    items: Array
  },
  components: {
    ErgonomicsChip,
    HorizontalRecoilChip,
    VerticalRecoilChip,
    RecoilModifierChip,
    WeightChip,
    PriceChip,
    TraderPriceCard,
    MarketPriceCard,
    AttachmentImage,
    WeaponImage,
    TraderPortrait
  },
  methods: {
    guid() {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      );
    }
  },
  data: () => ({
    search: "",
    headers: [
      {
        text: "Image",
        value: "img",
        sortable: false,
        filterable: false
      },
      {
        text: "Short Name",
        value: "short_name"
      },
      {
        text: "Full Name",
        value: "name"
      },
      {
        text: "Flea Market (24h Avg)",
        value: "price"
      },
      {
        text: "Trader",
        value: "none"
      },
      {
        text: "Trader Price",
        value: "trader_price"
      },
      {
        text: "Ergonomics",
        value: "ergonomics_modifier"
      },
      {
        text: "Recoil",
        value: "recoil_modifier"
      },
      {
        text: "Weight",
        value: "weight"
      }
    ]
  })
};
</script>
