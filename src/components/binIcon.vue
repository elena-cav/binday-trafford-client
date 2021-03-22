<template>
<svg :class="[colour, animationClass]" @mouseover="stopAppearAnimation" id="Layer_1" style="enable-background:new 0 0 48 48;" version="1.1" viewBox="0 0 48 48" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path fill="currentColor" d="M17.7,35.1C17.7,35.1,17.7,35.1,17.7,35.1c0.6,0,1-0.5,1-1L18,20.1c0-0.6-0.5-1-1-0.9c-0.6,0-1,0.5-0.9,1l0.7,13.9   C16.7,34.6,17.2,35.1,17.7,35.1z"/><path fill="currentColor" d="M29.9,35.1C30,35.1,30,35.1,29.9,35.1c0.6,0,1-0.4,1-0.9l0.7-13.9c0-0.6-0.4-1-0.9-1c-0.6,0-1,0.4-1,0.9L29,34   C29,34.6,29.4,35,29.9,35.1z"/><path fill="currentColor" d="M24,35.1c0.6,0,1-0.4,1-1V20.1c0-0.6-0.4-1-1-1s-1,0.4-1,1v13.9C23,34.6,23.4,35.1,24,35.1z"/><path fill="currentColor" d="M41,11.6H10.7l-0.7,0c0,0,0,0,0,0c0,0,0,0,0,0H7c-0.6,0-1,0.4-1,1s0.4,1,1,1h2.1l2.3,23.9c0.2,2.6,2.4,4.6,4.9,4.6h15   c2.6,0,4.7-2,4.9-4.6l2.3-23.9H41c0.6,0,1-0.4,1-1S41.6,11.6,41,11.6z M34.3,37.3c-0.1,1.6-1.4,2.7-2.9,2.7h-15   c-1.5,0-2.8-1.2-2.9-2.7l-2.2-23.7l25.4,0L34.3,37.3z"/><path fill="currentColor" d="M18.6,8h11.3c0.6,0,1-0.4,1-1s-0.4-1-1-1H18.6c-0.6,0-1,0.4-1,1S18,8,18.6,8z"/></g></svg>
</template>

<script>

export default {
  name: "binIcon",
  data() {
    return {
      animationClass: 'animate'

    }
  },
  props: {
    colour: {
      type: String
    }
  },
  methods: {
    stopAppearAnimation() {
      this.animationClass = ''
    }
  },
  mounted() {
    setTimeout(this.stopAppearAnimation, 1500)
  }

}

</script>


<style>
  .grey {
    color: var(--clr-grey-5)
  }
  .black {
    color: black;
  }
  .green {
    color: #52aa8a;
  }
  .blue {
    color: #00509d;
  }

  svg {
    width: 40%;
    
  }

  svg.animate {
animation: show 2s linear 1;
  }

  svg:hover {
    animation: shake 0.5s infinite;
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

  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  90% {
    transform: translate(1px, 2px) rotate(4deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(0deg);
  }
}
</style>