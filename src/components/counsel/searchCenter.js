// 검색기능
$(document).ready(function () {
	// 키워드 검색
	$('#searchBtn').on('click', function () {
		const keyword = $('#searchRegion').val() + ' 정신'
		ps.keywordSearch(keyword, placesSearchCB)
	})

	// 내 주소기반 검색
	$('#searchBtnMyRegion').on('click', function () {
		const keyword = $('#userRegion').val() + ' 정신'
		ps.keywordSearch(keyword, placesSearchCB)
	})

	// Enter로 검색
	$('#searchRegion').on('keydown', function (keyNum) {
		if (keyNum.keyCode == 13) {
			$('#searchBtn').trigger('click')
		}
	})
})
