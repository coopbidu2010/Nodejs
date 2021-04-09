const Handlebars = require('handlebars');

module.exports = {
    sum: (a, b) => a + b,
    sortTable: (field, sort) => {
      const sortType = field === sort.column ? sort.type : 'default'

      const icons = {
        default: 'https://image.flaticon.com/icons/png/128/98/98122.png',
        asc: 'https://image.flaticon.com/icons/png/128/2990/2990308.png',
        desc: 'https://image.flaticon.com/icons/png/128/1272/1272440.png',
      };

      const types = {
        default: 'desc',
        asc: 'desc',
        desc: 'asc'
      }

      const type = types[sortType];
      const icon = icons[sortType];

      const href = Handlebars.escapeExpression(`?_sort&column=${field}&type=${type}`)
      const output = `<a href="${href}">
      <img src="${icon}" class="icon-elevator">
      </a>`;
      return new Handlebars.SafeString(output);
    }
};