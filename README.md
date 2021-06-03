# minipool.io
Clone Game

Clone from https://minipool.io/
Using chrome extension [Resources Saver](https://github.com/up209d/ResourcesSaverExt)

[Demo](https://kidcry0x.github.io/minipool.io/)

For education only

## Hack

```javascript
  let key = 'minibillar-data-key-1';
  let data = JSON.parse(localStorage.getItem(key));
  for(let c of data.statistics.rewards.cards) {
  	c.cardPoints = c.cardName.startsWith('table') ? 200:100;
  }
  localStorage.setItem(key, JSON.stringify(data));
```
