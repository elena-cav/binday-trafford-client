<template>
  <div class="body">
    <div class="section-center">
      <div class="topBlock">
        <div class="logo-wrapper">
          <i class="rotate fas fa-sync-alt"></i>
          <h1 class="logo">binday</h1>
        </div>
        <h3 class="subtitle">Trafford</h3>
        <select
          class="selectionBlock"
          v-model="area"
          @change="onChange($event)"
        >
          <option
            class="optionsAreas"
            v-for="areaname in areas"
            :key="areaname"
            :selected="areaname === hello"
          >
            {{ areaname }}
          </option>
        </select>
      </div>

      <transition name="fade">
        <h1 v-if="!area" :class="[{ hiding: area }, 'welcome']">
          Welcome to binday Trafford, <br />
          please select your area
        </h1>
      </transition>

      <div v-if="area">
        <div class="binday-text">
          <h2 class="heading">Next collection in the {{ area }} area</h2>
          <h3 class="date">{{ date }}</h3>
        </div>
        <div class="binsBlock">
          <h3 class="binColours colouredText">{{ colour }}</h3>
          <h3 class="binColours greenText">green</h3>

          <binIcon class="binIcons colouredBin" :colour="colour" />
          <binIcon class="binIcons greenBin" colour="green" />
          <button class="colouredbtn btn" @click="showModal = true">
            what goes in my bin?
          </button>
          <button class="greenbtn btn" @click="showGreenModal = true">
            what goes in my bin?
          </button>

          <!-- <p>{{recyclableItems}}</p> -->
        </div>
      </div>
    </div>

    <transition name="fade" appear>
      <div
        class="modal-overlay"
        v-if="showModal"
        @click="showModal = false"
      ></div>
    </transition>
    <transition name="slide" appear>
      <div class="modal" v-if="showModal">
        <h1>What you can put in your {{ colour }} bin</h1>
        <p>{{ recyclableItems }}</p>
        <button class="btn" @click="showModal = false">Close</button>
      </div>
    </transition>

    <transition name="fade" appear>
      <div
        class="modal-overlay"
        v-if="showGreenModal"
        @click="showGreenModal = false"
      ></div>
    </transition>
    <transition name="slide" appear>
      <div class="green-modal" v-if="showGreenModal">
        <h1>What you can put in your green bin</h1>
        <p>{{ greenRecyclableItems }}</p>
        <button class="btn" @click="showGreenModal = false">Close</button>
      </div>
    </transition>
    <footer class="footer">
      <div class="footer-icons">
        <a
          href="https://www.trafford.gov.uk/residents/environment/recycling-rubbish-and-waste/bins-and-recycling.aspx"
          class="footer-icon"
        >
          <i class="fas fa-info-circle"></i>
        </a>
        <a href="mailto:elenacavallero@outlook.com" class="footer-icon">
          <i class="far fa-envelope"></i>
        </a>
      </div>
      <p class="footer-text">COPYRIGHT {{ currentYear }} © Elena Cavallero</p>
    </footer>
  </div>
</template>

<script>
import BinDayDataService from "../../services/binDayDataService";
import binIcon from "./binIcon";

export default {
  name: "binday",
  data() {
    return {
      date: null,
      colour: null,
      area: null,
      recyclableItems: null,
      areas: ["Lacy Street", "Skelton Road", "Warwick Road"],
      greenRecyclableItems: null,
      showGreenModal: false,
      showModal: false,
      currentYear: new Date().getFullYear(),
    };
  },
  components: {
    binIcon,
  },
  // props: {
  //   name: {
  //     type: String,
  //     required: true
  //   },
  // },
  methods: {
    getBinInfo(area) {
      BinDayDataService.getBinByArea(area).then(({ data }) => {
        const { date, colour, area, recyclableItems } = data;
        this.date = date;
        this.colour = colour;
        this.area = area;
        this.recyclableItems = recyclableItems;
      });
    },

    getGreenBinInfo() {
      BinDayDataService.getGreenBinContent().then(({ data }) => {
        // console.log('here', res)
        const { recyclableItems } = data;
        this.greenRecyclableItems = recyclableItems;
      });
    },

    onChange(event) {
      this.getBinInfo(event.target.value);
      this.getGreenBinInfo();
    },
  },
};
</script>

