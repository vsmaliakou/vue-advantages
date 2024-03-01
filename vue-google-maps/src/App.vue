<script setup>
/* eslint-disable no-undef */
import { useGeolocation } from '@/useGeolocation';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { Loader } from '@googlemaps/js-api-loader';

const GOOGLE_MAPS_API_KEY = '';

const { coords } = useGeolocation();
const currPos = computed(() => ({
  lat: coords.value.latitude,
  lng: coords.value.longitude,
}));
const otherPos = ref(null);
const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY });
const mapDiv = ref(null);
let map = ref(null);
let clickListener = null;

onMounted(async () => {
  await loader.load();
  map.value = new google.maps.Map(mapDiv.value, {
    center: currPos.value,
    zoom: 7,
  });
  clickListener = map.value.addListener('click', ({ latLng: { lat, lng } }) => (otherPos.value = { lat: lat(), lng: lng() }));
});

onUnmounted(async () => {
  if (clickListener) clickListener.remove();
});

let line = null;
watch([map, currPos, otherPos], () => {
  if (line) {
    line.setMap(null);
  }

  if (map.value && otherPos.value !== null) {
    line = new google.maps.Polyline({
      path: [currPos.value, otherPos.value],
      map: map.value,
    });
  }
});

const haversineDistance = (pos1, pos2) => {
  const R = 3958.8;
  const rlat1 = pos1.lat * (Math.PI / 180);
  const rlat2 = pos2.lat * (Math.PI / 180);
  const difflat = rlat2 - rlat1;
  const difflon = (pos2.lng - pos1.lng) * (Math.PI / 180);

  const d =
    2 *
    R *
    Math.asin(
      Math.sqrt(
        Math.sin(difflat / 2) * Math.sin(difflat / 2) +
          Math.cos(rlat1) *
            Math.cos(rlat2) *
              Math.sin(difflon / 2) *
                Math.sin(difflon / 2)
      )
    );
  return d;
};

const distance = computed(() => {
  return otherPos.value === null ? 0 : haversineDistance(currPos.value, otherPos.value);
});
</script>

<template>
  <div class="d-flex text-center" style="height: 20vh;">
    <div class="m-auto">
      <h4>Your Position</h4>

      Latitude: {{ currPos.lat.toFixed(2) }}, Longitude: {{ currPos.lng.toFixed(2) }}
    </div>

    <div class="m-auto">
      <h4>Distance</h4>

      {{ distance.toFixed(2) }} miles
    </div>

    <div class="m-auto">
      <h4>Clicked Position</h4>

      <span v-if="otherPos">
        Latitude: {{ otherPos?.lat.toFixed(2) }}, Longitude: {{ otherPos?.lng.toFixed(2) }}
      </span>

      <span v-else>Click the map to select a position</span>
    </div>
  </div>

  <div ref="mapDiv" style="width: 100%; height: 80vh;" />
</template>
