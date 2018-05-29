const TASTEDIVE_SEARCH_URL = 'https://tastedive.com/api/similar';
const apiKey = '309203-mediasea-3T1SAXA6';

function getDataFromApi(searchTerm, callback) {
    const settings = {
        url: TASTEDIVE_SEARCH_URL,
        data: {
            k: apiKey,
            q: searchTerm,
        },
        dataType: 'json',
        type: 'GET',
        success: callback
    };

    $.ajax(settings);
}

function renderResult(result) {
    return `
    <div class="injected-results-container">
      <div>
        <a class="js-result-name" href="https://tastedive.com/like/${result.Name}" target="_blank">${result.Name}</a>
        <div>${result.Type}</div>
      </div>
      <br></br>
    </div>
  `;
}

function displayTasteDiveSearchData(data) {
    console.log('Data object retrieved:');
    console.log(data);
    const results = data.Similar.Results.map((item) => renderResult(item));
    $('.js-search-results').html(results);
}

function watchSubmit() {
    $('.js-search-form').submit(event => {
        event.preventDefault();
        const queryTarget = $(event.currentTarget).find('.js-query');
        const query = queryTarget.val();
        // clear out the input
        queryTarget.val("");
        // $('main').prop('hidden', false);
        getDataFromApi(query, displayTasteDiveSearchData);
    });
}

$(watchSubmit);
