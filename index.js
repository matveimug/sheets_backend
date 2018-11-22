const parseSheet = data => {
    return data.feed.entry.map(entry => {
        return Object.keys(entry)
            .map(field => {
                if (field.startsWith("gsx$")) {
                    return [field.split("$")[1], entry[field].$t];
                }
            })
            .filter(field => field)
            .reduce((field, item) => {
                field[item[0]] = item[1];
                return field;
            }, {});
    });
};
const id = '16ipCUJGZ8wNm-jHlClaMWis3o8wc2wWSs8w6VhxqNHc';

new Vue({
  el: "#app",
  data: {
    title: 'hello world!',
    loaded: false,
    sheets: []
  },
  created() {
      let self = this;
      fetch(`https://spreadsheets.google.com/feeds/list/${id}/od6/public/values?alt=json`)
          .then(res => res.json())
          .then(res => {
              self.sheets = parseSheet(res);
          });
  },
  template: `
  <div>
    <p v-for="item in sheets"><label>{{item.title}}</label> - <label>{{item.content}}</label></p>
  </div>
  `
});
