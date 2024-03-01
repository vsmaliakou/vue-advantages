<script setup>
import { computed, onMounted, ref, watch } from 'vue';
const player = ref('X');
const squares = ref([
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
]);

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

const winner = computed(() => calculateWinner(squares.value.flat()));

const move = (x, y) => {
  if (winner.value) {
    return;
  }

  squares.value[x][y] = player.value;
  player.value = player.value === 'O' ? 'X' : 'O';
};

const reset = () => {
  player.value = 'X';
  squares.value = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
};

const history = ref([]);

watch(winner, (current, previous) => {
  if (current && !previous) {
    history.value.push(current);
    localStorage.setItem('history', JSON.stringify(history.value));
  }
});

onMounted(() => {
  history.value = JSON.parse(localStorage.getItem('history')) ?? [];
});
</script>

<template>
  <div class="container">
    <h2 v-if="winner">Winner: {{ winner }}</h2>

    <h2 v-else>Players Move: {{ player }}</h2>

    <button @click="reset" class="btn btn-success mb-3">Reset</button>

    <div v-for="(_, x) in 3" :key="x" class="row">
      <button v-for="(_, y) in 3" :key="y" class="square" @click="move(x, y)">{{ squares[x][y] }}</button>
    </div>

    <h2 class="mt-5">History</h2>

    <div v-for="(game, index) in history" :key="index">Game {{ index + 1 }}: {{ game }} won</div>
  </div>
</template>

<style scoped>
.square {
  background: #fff;
  border: 1px solid #999;
  float: left;
  font-size: 70px;
  font-weight: bold;
  line-height: 34px;
  height: 100px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 100px;
}
</style>
