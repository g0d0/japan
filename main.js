import './style.css'
import render from './src/render';
import { loadAttractions } from './src/attractions';

(async () => {
  localStorage.setItem('query', '')
  localStorage.setItem('sortColumn', 'updated_at')
  localStorage.setItem('sortOrder', 'asc')
  localStorage.setItem('offset', 0)

  render(await loadAttractions())
})();
