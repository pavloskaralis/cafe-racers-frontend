<template>
  <div
    v-on="tracking ? { keydown: trackInput } : {}"
    tabindex="0"
    class="game-pieces"
  >
    <div class="player-container">
      <cup :state="p1Cup"></cup>
      <cup :state="p2Cup"></cup>
    </div>

    <div class="text-container">
      <div v-if="prompt" class="prompt-container">
        <div class="prompt-body">
          <div class="prompt-question">
            {{ prompt }}
          </div>
          <div v-if="promptOptions" class="prompt-options">
            <app-button
              :id="'button' + index"
              type="game-button"
              :key="index"
              v-for="(option, index) in promptOptions"
              :text="option"
              @clicked="processClick"
            >
            </app-button>
          </div>
        </div>
      </div>

      <div class="text-body" id="text-body">
        <span
          :key="wordIndex"
          v-for="(word, wordIndex) in apiWords"
          class="text-word"
        >
          <letter
            :v-if="apiText"
            :key="wordIndex + '_' + letterIndex"
            :id="wordIndex + '_' + letterIndex"
            v-for="(letter, letterIndex) in word.split('')"
            :letter="letter"
            :status="getLetterState(wordIndex, letterIndex)"
            :isWrong="mistake"
          >
          </letter>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Cup from "./Cup";
import Letter from "./Letter";
import Button from "./Button";
// import Echo from 'laravel-echo';
 
// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//   broadcaster: 'pusher',
//   key: 'cafe_racers',
//   cluster: 'mt1',
//   host: 'cafe-racers-backend.herokuapp.com',
//   authEndpoint: 'cafe-racers-backend.herokuapp.com/broadcasting/auth',
//   auth: {
//     headers: {
//       Accept: 'application/json',
//     },
//   }
// });


export default {
  name: "two-player",
  components: {
    cup: Cup,
    letter: Letter,
    "app-button": Button,
  },
  data() {
    return {
      updater: '',
      id: "",
      prompt: "",
      tracking: 0,
      currentLetterID: "",
      mistake: 0,
      player1: "",
      player2: "",
      apiText: "",
      p1Text: "",
      p2Text: "",
      p1Again: 0,
      p2Again: 0,
      end: 0,
      time: 0,
    };
  },

  watch: {
    winner() {
      if (this.winner) {
        if(this.userIs === "player1" && !this.p1Text) this.endGame();
        if(this.userIs === "player2" && !this.p2Text) this.endGame();
        this.tracking = 0;
        this.prompt = "Play Again?";
      }
    },
    async p1Again() {
      const url = `https://cafe-racers-backend.herokuapp.com/api/games/${this.id}`;
      let request = { p1_again: this.p1Again };
      await this.$axios.put(url, request);

      if (this.userIs === "player1" && this.p1Again && !this.end && !this.tracking) {
        this.prompt = "Waiting For Other Player";
      }
    },
    async p2Again() {
      const url = `https://cafe-racers-backend.herokuapp.com/api/games/${this.id}`;
      let request = { p2_again: this.p2Again };
      await this.$axios.put(url, request);

      if (this.userIs === "player2" && this.p2Again && !this.end && !this.tracking) {
        this.prompt = "Waiting For Other Player";
      }
    },
    async apiText() {
      const url = `https://cafe-racers-backend.herokuapp.com/api/games/${this.id}`;
      const request = {
        api_text: this.apiText,
      };
      //prevent 2 requests
      if(this.userIs === "player1") await this.$axios.put(url, request);
    },
    async time() {
      const url = `https://cafe-racers-backend.herokuapp.com/api/games/${this.id}`;
      const request = {
        time: this.time,
      };
      //prevent 2 requests
      if(this.userIs === "player1") await this.$axios.put(url, request);
    },
    async tracking() {
      const url = `https://cafe-racers-backend.herokuapp.com/api/games/${this.id}`;
      const request = {
        tracking: this.tracking,
      };
      //prevent 2 requests
      if(this.userIs === "player1") await this.$axios.put(url, request);
    },
    async p1Text() {
      const url = `https://cafe-racers-backend.herokuapp.com/api/games/${this.id}`;
      const request = {
        p1_text: this.p1Text,
      };
      //prevent two requests
      if(this.userIs === "player1" && this.p1Text.length < this.apiText.length && !this.restart) await this.$axios.put(url, request);
    },
    async p2Text() {
      const url = `https://cafe-racers-backend.herokuapp.com/api/games/${this.id}`;
      const request = {
        p2_text: this.p2Text,
      };
      //prevent two requests
      if(this.userIs === "player2" && this.p2Text.length < this.apiText.length && !this.restart) await this.$axios.put(url, request);
    },
    start() {
      if(this.start) this.startGame();
    },
    restart() {
      if (this.restart) this.restartGame();
    },
    end() {
      this.prompt = "Opponent Has Left";
    },
  },

  computed: {
    start() {
      return this.player1 && this.player2 && !this.p1Text && !this.p2Text && !this.tracking
        ? 1
        : 0;
    },
    restart() {
      return this.p1Again && this.p2Again ? 1 : 0;
    },
    apiWords() {
      const apiWords = [];
      if (!this.apiText) return apiWords;

      const apiTextSplit = this.apiText.split(" ");
      for (let i = 0; i < apiTextSplit.length; i++) {
        if (i !== apiTextSplit.length - 1) apiTextSplit[i] += " ";
        apiWords.push(apiTextSplit[i]);
      }
      return apiWords;
    },
    p1Speed() {
      if (this.p1Text && this.time) {
        let newTime = Date.now() / 1000;
        let difference = newTime - this.time;

        return Math.round((this.p1Text.split(" ").length / difference) * 60);
      }
      return 0;
    },
    p2Speed() {
      if (this.p2Text && this.time) {
        let newTime = Date.now() / 1000;
        let difference = newTime - this.time;
        return Math.round((this.p2Text.split(" ").length / difference) * 60);
      }
      return 0;
    },
    p1Completion() {
      return this.p1Text ? (this.p1Text.length / this.apiText.length) * 100 : 0;
    },
    p2Completion() {
      return this.p2Text ? (this.p2Text.length / this.apiText.length) * 100 : 0;
    },
    userIs() {
      if (this.$store.state.id === this.player1) {
        return "player1";
      } else if (this.$store.state.id === this.player2) {
        return "player2";
      } else {
        return "unknown";
      }
    },
    winner() {
      if (this.p1Completion === 100 || this.p2Completion === 100) {
        if (this.p1Completion === 100 && this.p2Completion === 100)
          return "tie";
        return this.p1Completion === 100 ? "player1" : "player2";
      } else {
        return "";
      }
    },
    p1Cup() {
      return {
        cup: "left",
        player: this.player1 ? this.userIs : "empty",
        speed: this.p1Speed,
        completion: this.p1Completion,
        winner: this.winner,
      };
    },
    p2Cup() {
      return {
        cup: "right",
        player: this.player2 ? this.userIs : "empty",
        speed: this.p2Speed,
        completion: this.p2Completion,
        winner: this.winner,
      };
    },
    promptOptions() {
      return {
        "Select AI Difficulty": ["easy", "medium", "hard"],
        "Play Again?": ["yes", "no"],
        "Click Link To Copy": [`http://cafe-racers.herokuapp.com/2-player/${this.id}`],
        "Click Ready To Join": ["ready"],
        "Share Copied Link": [`http://cafe-racers.herokuapp.com/2-player/${this.id}`],
        "Opponent Has Left": ["exit"],
      }[this.prompt];
    },
  },

  methods: {
    async restartGame() {
      if (this.userIs === "player1") {
        const url = `https://cafe-racers-backend.herokuapp.com/api/games/${this.id}`;
        const request = {
          p1_text: "",
        };

        await this.$axios.put(url, request);
        this.p1Text = "";
      } else if (this.userIs === "player2") {
        const url = `https://cafe-racers-backend.herokuapp.com/api/games/${this.id}`;
        const request = {
          p2_text: "",
        };

        await this.$axios.put(url, request);
        this.p2Text = "";
        document.getElementById("text-body").scrollTop = 0;

      }
    },
    async startGame() {
      // console.log("starting")
      //must be done here since restart is dependent on both p1Again and p2Again
      if (this.userIs === "player1" && this.p1Again) this.p1Again = 0;
      if (this.userIs === "player2" && this.p2Again) this.p2Again = 0;
      //get api text; prevent 2 requests
      if(this.userIs === "player1") await this.getIpsum();
      //countdown
      for (let i = 5; i > 0; i--) {
        setTimeout(()=> this.prompt = `Start Typing In ${i}`, 1000 * [4,3,2,1,0][i-1])
      }
      setTimeout(() => {
        //resets mistake if player ended on a mistake
        this.mistake = 0;
        //reveals api text
        this.prompt = "";
        //enables keydown listener; 2 requests 
        this.tracking = 1;
        //starting time
        let date = Date.now() / 1000;
        //prevent dates getting set twice 
        if(this.userIs === "player1") this.time = date;
      }, 5000);
    },
    async getIpsum() {
      const hipsterQuery =
        "https://hipsum.co/api/?type=hipster-centric&sentences=2";
      const hipsterResponse = await this.$axios.get(hipsterQuery);
      const hipsterText = hipsterResponse.data[0];
      this.apiText = hipsterText;
      // this.apiText = "abc";
    },
    async getGame() {
      try {
        const url = `https://cafe-racers-backend.herokuapp.com/api/games/${this.id}`;
        const response = await this.$axios.get(url);
        const data = response.data[0];

        if (data.tracking) this.tracking = data.tracking;
        if (data.p1_again) this.p1Again = data.p1_again;
        if (data.p1_text) this.p1Text = data.p1_text;
        if (data.player1) this.player1 = data.player1;
        if (data.p2_again) this.p2Again = data.p2_again;
        if (data.p2_text) this.p2Text = data.p2_text;
        if (data.player2) this.player2 = data.player2;
        if (data.time) this.time = data.time;
        if (data.end) this.end = data.end;
        if (data.api_text) this.apiText = data.api_text;
        console.log("p1text",this.p1Text === true,"p2Text",this.p2Text === true,"winner",this.winner === true, "end",this.end === true)
        if (!this.player2 && this.userIs === "player1" && !this.end) {
          this.prompt = "Click Link To Copy";
        }
        if (this.player1 && !this.player2 && this.userIs !== "player1" && !this.end) {
          this.prompt = "Click Ready To Join";
        }

        if(this.end && this.player1) this.player1 = "";
        if(this.end && this.player2) this.player2 = "";
        if(this.end && this.userIs === "unknown")this.$router.push("/");
       
      } catch {
        this.$router.push("/");
      }
    },
    async trackInput() {
      //fail safe to switch back again
      // if(this.userIs === "player1" && this.p1Again) this.p1Again = 0;
      // if(this.userIs === "player2" && this.p2Again) this.p2Again = 0;

      let key = event.key;
      let currentTextLength =
        this.userIs === "player1" ? this.p1Text.length : this.p2Text.length;
      let currentLetter = this.apiText[currentTextLength];
      //prevent spectator input
      if (this.userIs === "player1" || this.userIs === "player2") {
        //ignore shift key since needed for capital letters
        if (key !== currentLetter && key !== "Shift") {
          this.mistake = 1;
        }
        if (key === currentLetter) {

          if(this.userIs === "player1" && this.p1Text.length === this.apiText.length - 1){
            this.tracking = false; 

            const url = `https://cafe-racers-backend.herokuapp.com/api/games/${this.id}`;
            const request = {
              p1_text: this.p1Text + key,
            };

            await this.$axios.put(url, request);
            this.p1Text += key

          } else if (this.userIs === "player2" && this.p2Text.length === this.apiText.length - 1){
            this.tracking = false; 

            const url = `https://cafe-racers-backend.herokuapp.com/api/games/${this.id}`;
            const request = {
              p2_text: this.p2Text + key,
            };

            await this.$axios.put(url, request);
            this.p2Text += key

          } else {            
            this.userIs === "player1"
            ? (this.p1Text += key)
            : (this.p2Text += key);
            this.mistake = 0;
            this.autoScroll();
          }
        }
      }
    },
    processClick(event) {
      switch (event) {
        case "yes":
          this.userIs === "player1"
            ? (this.p1Again = 1)
            : (this.p2Again = 1);
          break;
        case "no":
          this.endGame();
          break;
        case `http://cafe-racers.herokuapp.com/2-player/${this.id}`:
          this.copyLink();
          break;
        case "ready":
          this.addPlayer2();
          break;
        case "exit":
          this.$router.push("/");
          break;
      }
    },
    async endGame() {
      const url = `https://cafe-racers-backend.herokuapp.com/api/games/${this.id}`;
      let request = {
        end: 1,
      };
      this.userIs === "player1" ? request["player1"] = "" : request["player2"] = ""
      await this.$axios.put(url, request);
      this.$router.push("/");
    },
    copyLink() {
      let text = document.getElementById("button0").children[0].textContent;
      let inp = document.createElement("input");
      document.body.appendChild(inp);
      inp.value = text;
      inp.select();
      document.execCommand("copy", 0);
      inp.remove();
      this.prompt = "Share Copied Link";
    },
    async addPlayer2() {
      const url = `https://cafe-racers-backend.herokuapp.com/api/games/${this.id}`;
      const request = {
        player2: this.$store.state.id,
      };
      if (!this.player2) await this.$axios.put(url, request);
    },
    getLetterState(wordIndex, letterIndex) {
      //default
      let state = "active";
      //get all words of client
      let splitText =
        this.userIs === "player1"
          ? this.p1Text.split(" ")
          : this.p2Text.split(" ");
      //add spaces to match api words
      const words = [];
      for (let i = 0; i < splitText.length; i++) {
        if (i !== splitText.length - 1) splitText[i] += " ";
        words.push(splitText[i]);
      }
      //find client's last word and letter indexes
      const lastWordIndex = words.length - 1;
      const lastLetterIndex = words[lastWordIndex].length - 1;
      //if last word of client text is fully spelled
      if (words[lastWordIndex] === this.apiWords[lastWordIndex]) {
        //the first letter of the next word is current
        if (wordIndex === lastWordIndex + 1 && letterIndex === 0) {
          state = "current";
          this.currentLetterID = wordIndex + "_" + letterIndex;
        }
        //and all letters in words before the next word are innactive
        if (wordIndex <= lastWordIndex) state = "inactive";
        //otherwise if the last word is not fully spelled
      } else if (words[lastWordIndex] !== this.apiWords[lastWordIndex]) {
        //the first unexisting letter of the current word is current
        if (
          wordIndex === lastWordIndex &&
          letterIndex === lastLetterIndex + 1
        ) {
          state = "current";
          this.currentLetterID = wordIndex + "_" + letterIndex;
        }
        //and all letters in the current word before the current letter are inactive;
        if (wordIndex === lastWordIndex && letterIndex < lastLetterIndex + 1)
          state = "inactive";
        //as well as all letters in words before the current word
        if (wordIndex < lastWordIndex) state = "inactive";
      }
      return state;
    },
    autoScroll(remount) {
      let letter = document.getElementById(this.currentLetterID);
      let textBody = document.getElementById("text-body");
      let tbHeight = textBody.getBoundingClientRect().top;
      let lHeight = letter.getBoundingClientRect().top;
      let scrollHeight = lHeight - tbHeight;
      if (scrollHeight > 80) textBody.scrollTop += remount ? scrollHeight - 20 : 25;
    },
    async updateGame() {
      const url = `https://cafe-racers-backend.herokuapp.com/api/games/${this.id}`;
      const response = await this.$axios.get(url);
      const data = response.data[0];
      // console.log("checking")
      if (this.player1 !== data.player1) this.player1 = data.player1;
      if (this.player2 !== data.player2) this.player2 = data.player2;
      if (!this.end !== data.end) this.end = data.end;

      if (this.userIs === "player1" && this.p2Again !== data.p2_again) this.p2Again = data.p2_again;
      if (this.userIs === "player1" && this.p2Text !== data.p2_text) this.p2Text = data.p2_text;
      
      if (this.userIs === "player2" && this.p1Again !== data.p1_again) this.p1Again = data.p1_again;
      if (this.userIs === "player2" && this.p1Text !== data.p1_text) this.p1Text = data.p1_text;

      if (this.userIs === "player2" && !this.time !== data.time) this.time = data.time;
      if (this.userIs === "player2" && this.apiText !== data.api_text) this.apiText = data.api_text;
    }
  },
  async mounted() {
    // console.log("mounting")
    let path = this.$route.path;
    this.id = path.split("/")[2];
    await this.getGame();
    if(this.tracking)this.autoScroll(true); 

    this.updater = setInterval(()=> {
      this.updateGame();
    },250)
    // window.Echo.channel('game')
    //   .listen('GameProgress', (e) => {
    //     console.log(e)
    //   });
  },
  updated() {
    // console.log("updating") 
  },
  beforeDestroy() {
    clearInterval(this.updater);
    // console.log("destroying")
    if (this.end) {
      const url = `https://cafe-racers-backend.herokuapp.com/api/games/${this.id}`;
      this.$axios.delete(url);
    }
  },
};
</script>
<style src="../styles/Pieces.scss" scoped lang="scss"></style>
