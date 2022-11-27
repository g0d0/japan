import './style.css'
import render from './src/render';
import { loadAttractions } from './src/attractions';

document.querySelector('#app').innerHTML = `
  <div class="container">
    <div class="search-container">
      <input class="query" type="text" placeholder="Search">
    </div>
  
    <table id="attractions-table">
      <thead>
        <th>Image</th> 
        <th class="sort" data-sort="name">Name</th>
        <th class="sort" data-sort="theme">Theme</th>
        <th class="sort" data-sort="type">Type</th>
        <th class="sort" data-sort="cost">Cost</th>
        <th class="sort" data-sort="est_cust">Estimated Customers</th>
        <th class="sort" data-sort="maintenance_time">Maintenance Time</th>
        <th class="sort" data-sort="workers">Workers Required</th>
        <th class="sort active" data-sort="updated_at">Updated</th>
      </thead>
      <tbody>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="9"></td>
        </tr>
      </tfoot>
    </table>

    <div class="flex content-center mt-2">
      <button
        type="button"
        id="load-more-button"
        class="load-more-button"
      >
        Load More
      </button>
    </div>
  </div>
`;

localStorage.setItem('query', '')
localStorage.setItem('sortColumn', 'updated_at')
localStorage.setItem('sortOrder', 'asc')
localStorage.setItem('offset', 0)

render(loadAttractions());
