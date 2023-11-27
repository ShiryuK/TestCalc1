<!--
制作者：近藤士龍
制作日：2023/11/26
-->

<template>
  <div class="form-container">
    <div class="title-container">
      <div class="Title">
        <h2>通勤・通学定期<br>何回乗ればお得になる？</h2>
      </div>
    </div>
    <p class="app-info">定期を購入した際に、<br>何回利用すればお得になるか計算します</p>
    <p class="URL">
      <a href="https://www.navitime.co.jp/transfer/pass/" target="_blank">定期代検索</a>
      <a href="https://ekitan.com/transit/pass" target="_blank">新幹線・特急の定期代検索</a>
    </p>
    <div class="form-group">
      <label for="textbox1">定期代:</label>
      <input type="text" v-model="定期代" id="textbox1" name="textbox1">円
      <!-- 定期代のバリデーションメッセージ -->
      <p v-if="定期代エラー" class="error-message">定期代を半角数字、7桁以内で入力してください</p>
    </div>
    <div class="form-group">
      <label for="textbox3">期間:</label>
      <!-- プルダウンメニューの追加 -->
      <select v-model="期間" id="textbox3" name="textbox3">
        <option value="1">1</option>
        <option value="3">3</option>
        <option value="6">6</option>
      </select>ヶ月
    </div>
    <p class="URL">
      <a href="https://transit.yahoo.co.jp/" target="_blank">料金検索</a>
    </p>
    <div class="form-group">
      <label for="textbox2">片道運賃:</label>
      <input type="text" v-model="片道運賃" id="textbox2" name="textbox2">円
      <!-- 片道運賃のバリデーションメッセージ -->
      <p v-if="片道運賃エラー" class="error-message">片道運賃を半角数字、5桁以内で入力してください</p>
    </div>
    <!-- 答えボタンの追加 -->
    <button @click="calculate">計算</button>
    <!-- 計算結果の表示 -->
    <div v-if="result !== null">
      <div class="answers">
        <p>{{ this.期間 }}ヶ月に{{ this.multiplier }}回</p>
        <p v-if="期間 !== '1'">1か月に{{ (this.multiplier / this.期間).toFixed(2) }} 回</p>
        <p>1週間に {{ ((this.multiplier / this.期間) / 4).toFixed(2) }} 回乗るなら定期がお得です</p>
      </div>
      <p>※1回＝1往復を指します</p>
    </div>
    <p class="copyright"><br>©ShiryuKondo</p>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      定期代: '',
      片道運賃: '',
      期間: '1',
      multiplier: 1,
      result: null,
      往復運賃: null,
      定期代エラー: false,
      片道運賃エラー: false,
    };
  },
  methods: {
    calculate() {
      this.定期代エラー = !this.isValidInput(this.定期代)  || this.定期代.length > 7 || this.定期代 === '0' || this.定期代 === '00' || this.定期代 === '000' || this.定期代 === '0000' || this.定期代 === '00000' || this.定期代 === '000000' || this.定期代 === '0000000';
      this.片道運賃エラー = !this.isValidInput(this.片道運賃) || this.片道運賃.length > 5 || this.片道運賃 === '0' || this.片道運賃 === '00' || this.片道運賃 === '000' || this.片道運賃 === '0000' || this.片道運賃 === '00000';

      if (this.定期代エラー || this.片道運賃エラー) {
        // 入力が無効な場合、計算を中止
        return;
      }

      this.multiplier = 1;
      this.result = null;
      this.往復運賃 = this.片道運賃 * 2;
      while (this.result < this.定期代) {
        this.multiplier = this.multiplier + 1;
        this.result = this.往復運賃 * this.multiplier;
      }
    },
    isValidInput(value) {
      // 半角数字の正規表現
      const regex = /^[0-9]+$/;
      return regex.test(value);
    },
  },
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 20px;
  background-color: #FFDFFC6D;
}

.title-container {
font-size: 1.5rem;
  color: #FFFFFF; /* タイトルの文字色 */
  background-color: #B1D8A8; /* タイトルの背景色 */
  text-shadow:
    -1px -1px 0 #3434346D,  
    1px -1px 0 #3434346D,
    -1px 1px 0 #3434346D,
    1px 1px 0 #3434346D; /* テキストに輪郭線を追加 */
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* タイトルの影 */
}

.Title {
  width: auto;
  height: auto;
  padding: 5px;
  text-align: center;
}

.URL a {
  display: inline-block;
  margin-right: 10px; /* リンク間の隙間を10pxに設定（必要に応じて調整） */
}

.app-info {
  font-weight: bold;
  padding: 15px; /* テキストと枠の間に余白を設定 */
  border: 2px solid #9C9C9C; /* 枠線のスタイルと色を指定 */
  border-radius: 5px; /* 枠線の角を丸くする */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 枠線に影を追加 */
}

.form-container {
  max-width: 400px;
  margin: auto;
  background-color: #FFFFFF;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: inline-block; /* インラインブロック要素に変更 */
  width: 80px; /* ラベルの横幅を調整 */
  margin-bottom: 5px;
}

/* 幅を小さくするスタイル */
input[type="text"] {
  width: calc(70% - 8px); /* インラインブロックとして配置されるので、ラベルの幅を引いた幅に設定 */
  padding: 8px;
  box-sizing: border-box;
}

button {
  display: block;
  background-color: #B1D8A8;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  margin: auto;
  text-shadow:
    -1px -1px 0 #5151516D,  
    1px -1px 0 #5151516D,
    -1px 1px 0 #5151516D,
    1px 1px 0 #5151516D; /* テキストに輪郭線を追加 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* タイトルの影 */
}

.answers {
  font-weight: bold;
}

.error-message {
  color: red;
  margin-top: 5px;
}

.copyright {
  font-size: 0.8rem;
  text-align: center;
  margin-top: 20px;
}
</style>
