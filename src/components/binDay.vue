<template>
  <div class="section-center clearfix">
    <div class="area">
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
          <option v-for="areaname in areas" :key="areaname">
            {{ areaname }}
          </option>
        </select>
      </div>

      <div v-if="area">
        <div class="binday-text">
          <h2 class="heading">Next collection in the {{ area }} area</h2>
          <h3 class="date">{{ date }}</h3>
        </div>
        <div class="binsBlock">
          <h3 class="binColours colouredText">{{ colour }}</h3>
          <h3 class="binColours greenText">green</h3>

          <!-- <p>{{recyclableItems}}</p> -->

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
        <h1>What you can put in your {{colour}}bin</h1>
        <p>{{recyclableItems}}</p>
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
        <p>{{greenRecyclableItems}}</p>
        <button class="btn" @click="showGreenModal = false">Close</button>
      </div>
    </transition>
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
      showGreenModal: false,
      showModal: false
      // bins: [
      //   {binColour: 'grey',
      //   binImage: }
      // ]
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

      getAllBinsInfo(area) {
        BinDayDataService.getBinsByArea(area).then(({data}) => {
          const {recyclableItems} = data 
          this.greenRecyclableItems = recyclableItems
        })
      },


    onChange(event) {
      this.getBinInfo(event.target.value);
    },



  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Baloo+Tammudu+2:wght@400;600&display=swap&family=Montserrat:ital,wght@0,400;0,600;1,400;1,600&display=swap");

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

:root {
  --clr-primary: #5ca4a9;
  --clr-background: #e6ebe0;
  --clr-secondary: #9bc1bc;
  --clr-grey-1: #102a42;
  --clr-grey-5: #87939e;
  --clr-grey-10: #f1f5f8;
  --clr-red: #ed6a5a;
  --clr-yellow: #f4f1bb;
  --clr-white: #fff;
  --ff-primary: "Montserrat", sans-serif;
  --ff-secondary: "Baloo Tammudu 2", cursive;
  --transition: all 0.3s linear;
  --spacing: 0.15rem;
  --spacing-secondary: 0.05rem;
  --radius: 0.5rem;
}

.section-center {
  max-width: 1170px;
  position: relative;
}

h1,
h2,
h3,
h4 {
  color: var(--clr-primary);
  letter-spacing: var(--spacing);
  line-height: 1;
}

h1 {
  font-family: var(--ff-secondary);
  font-size: 1.5rem;
  margin-bottom: 0rem;

  font-weight: 400;
}
h2 {
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 0;
}

h3 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--clr-primary);
  margin-top: 0;
}

body {
  font-family: var(--ff-primary);
  background: var(--clr-background);
  color: black;
  line-height: 1.5;
  font-size: 0.875rem;
}

@media (min-width: 480px) {
  h1 {
    font-size: 2rem;
  }
  h2 {
    font-size: 1.5rem;
  }
  h3 {
    font-size: 1.5rem;
  }
}

.topBlock {
  padding: 2rem 1rem;
  background-color: var(--clr-red);
  width: 100%;
  height: auto;
  display: block;
}
.logo-wrapper {
  display: flex;
  color: var(--clr-yellow);
  align-items: flex-start;
  position: relative;
}

.rotate {
  font-size: 1rem;
  position: absolute;
  animation: rotation 2s;
}

.logo {
  margin-top: 0;
  color: var(--clr-yellow);
  clear: none;
  padding-left: 1.5rem;
}

.subtitle {
  line-height: 0;
  padding-left: 1.6rem;
  color: var(--clr-yellow);
}
.selectionBlock {
  height: 50px;
  margin: 1.5rem auto 0rem auto;
  display: flex;
  text-align: center;
  justify-content: center;
  justify-self: center;
  font-size: 0.8rem;
}

@media (min-width: 480px) {
  .selectionBlock {
    font-size: 1rem;
  }
}

.binday-text {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.heading,
.date {
  padding: 2rem 0.5rem;
}

.heading {
  color: var(--clr-white);
  background-color: var(--clr-primary);
  animation: slideFromRight 3s ease-in-out 1;
}

.date {
  background-color: var(--clr-yellow);
  color: var(--clr-primary);
  animation: slideFromLeft 3s ease-in-out 1;
}

.binsBlock {
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template: repeat(3, 1fr) / repeat(2, 1fr);
  grid-template-areas: "a b" "c d" "e f";
  column-gap: 1rem;
}

.binColours {
  text-transform: uppercase;
  animation: show 1.5s linear 1;
}
.binIcons {
  justify-content: center;
  animation: show 1.5s linear 1;
}
.colouredText {
  grid-area: a;
}
.greenText {
  grid-area: b;
}
.colouredBin {
  grid-area: c;
}
.greenBin {
  grid-area: d;
}

.colouredBtn {
  grid-area: e;
}
.greenBtn {
  grid-area: f;
}

.btn {
  text-transform: uppercase;
  background: none;
  /* background-color: var(--clr-yellow); */
  background-image: linear-gradient(to right, #f4f1bb, #f1eda7);
  color: var(--clr-primary);
  border-radius: 20%;
  padding: 1rem;
  font-weight: 700;
  transition: var(--transition);
  border: none;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.3);
  width: 75%;
  cursor: pointer;
}

.btn:hover {
  color: var(--clr-primary);
  background-color: #eeea95;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 98;
  background-color: rgba(0, 0, 0, 0.6);
}

.modal, .green-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50% -50%);
  z-index: 100;
  width: 100%;
  max-width: 400px;
  background-color: var(--clr-white);
  border-radius: 16px;
  padding: 25px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s;
}

.slide-enter,
.slide-leave-to {
  transform: translateY(-50%) translateX(100vw);
}

svg {
  width: 40%;
}

svg:hover {
  animation: shake 0.5s infinite;
}

/* animations */

@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-2px, -2px) rotate(-2deg);
  }
  20% {
    transform: translate(-4px, 0px) rotate(-5deg);
  }
  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(5deg);
  }

  /* 60% {
                transform: translate(-3px, 1px) rotate(0deg);
            } */
  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  /* 80% {
                transform: translate(-1px, -1px) rotate(2deg);
            } */
  90% {
    transform: translate(1px, 2px) rotate(4deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(0deg);
  }
}

@keyframes rotation {
  to {
    transform: rotate(360deg);
  }
}

@keyframes slideFromRight {
  0% {
    transform: translateX(1000px);
    opacity: 0;
  }
  50% {
    transform: translateX(-200px);
    opacity: 0.5;
  }

  75% {
    transform: translateX(50px);
    opacity: 0.75;
  }
  100% {
    transform: translateX(0px);
    opacity: 1;
  }
}

@keyframes slideFromLeft {
  0% {
    transform: translateX(-1000px);
    opacity: 0;
  }
  50% {
    transform: translateX(200px);
    opacity: 0.5;
  }

  75% {
    transform: translateX(-50px);
    opacity: 0.75;
  }
  100% {
    transform: translateX(0px);
    opacity: 1;
  }
}

@keyframes show {
  0% {
    transform: scale(1.1);
    opacity: 0;
  }
  50% {
    transform: scale(1.15);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
