<script>
import { computed, ref } from 'vue';
import { useKeyDown } from '@/assets/useKeyDown.js';

import HangmanHeader from '@/components/HangmanHeader.vue';
import HangmanFigure from '@/components/HangmanFigure.vue';
import HangmanWrongLetters from '@/components/HangmanWrongLetters.vue';
import HangmanWord from '@/components/HangmanWord.vue';
import HangmanPopup from '@/components/HangmanPopup.vue';
import HangmanNotification from '@/components/HangmanNotification.vue';

const words = ['programming', 'vuejs', 'composition'];
const randomWord = () => words[Math.floor(Math.random() * words.length)];

export default {
  components: {
    HangmanHeader,
    HangmanFigure,
    HangmanWrongLetters,
    HangmanWord,
    HangmanPopup,
    HangmanNotification,
  },
  setup() {
    const word = ref(randomWord());
    const guessedLetters = ref([]);
    const letters = computed(() => {
      return word.value.split('');
    });
    const wrongLetters = computed(() => {
      return guessedLetters.value.filter((l) => !letters.value.includes(l));
    });
    const correctLetters = computed(() => {
      return guessedLetters.value.filter((l) => letters.value.includes(l));
    });
    const status = computed(() => {
      if (wrongLetters.value.length === 6) {
        return 'lose';
      }

      if (letters.value.every((l) => correctLetters.value.includes(l))) {
        return 'win';
      }

      return '';
    });
    
    const reset = () => {
      guessedLetters.value = [];
      word.value = randomWord();
    };

    const notification = ref(false);

    const showNotification = () => {
      notification.value = true;
      setTimeout(() => {
        notification.value = false;
      }, 2000);
    };

    useKeyDown((event) => {
      const letter = event.key.toLowerCase();

      if (event.keyCode < 65 && event.keyCode > 90) {
        return;
      }

      if (status.value) {
        return;
      }

      if (guessedLetters.value.includes(letter)) {
        showNotification();
        return;
      }

      guessedLetters.value.push(letter);
    });

    return {
      letters,
      word,
      wrongLetters,
      correctLetters,
      guessedLetters,
      notification,
      status,
      reset,
    };
  },
};
</script>

<template>
  <HangmanHeader />

  <div class="game-container">
    <HangmanFigure :wrong-count="wrongLetters.length" />

    <HangmanWrongLetters :wrong-letters="wrongLetters" />

    <HangmanWord
      :letters="letters"
      :correct-letters="correctLetters"
    />
  </div>

  <HangmanPopup
    :status="status"
    :word="word"
    @reset="reset"
  />

  <HangmanNotification :show="notification" />
</template>
