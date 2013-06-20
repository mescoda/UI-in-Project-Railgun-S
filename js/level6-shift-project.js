
var itemIndexBlockColors = ['#5499C2', '#494949', '#A24C55'],
    mainPadding = 10,
    itemHeight = 30,
    column2Width = 950,
    column1Width = 600,
    columnCount,
    clientWidth,
    dataWidth,
    elemData = document.querySelector('.data'),
    elemItem = document.querySelector('.item');


function computeColumnCount() {
    clientWidth = document.documentElement.clientWidth;
    dataWidth = clientWidth - mainPadding * 2;
    if(clientWidth > 950) {
        columnCount = 3;
    } else if(clientWidth <= 600) {
        columnCount = 1;
    } else {
        columnCount = 2;
    }
}

function randomNum(min, max) {
    // return integer num >= min <= max
    return Math.floor( Math.random() * (max - min  + 1) + min);
}

function randomLetter() {
    var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    return alphabet[randomNum(0, alphabet.length - 1)];
}

function appendItems(startNum, num) {
    for(var i = startNum; i < startNum + num; i++) {
        createItem(i);
    }
}

function createItem(num) {
    var template = document.getElementById('tpl-item').innerHTML;
        tempItem = document.createElement('div');
    var itemIndexBlockColor = itemIndexBlockColors[randomNum(0, itemIndexBlockColors.length - 1)],
        itemGraphIntRange = randomNum(1, 100) + '%',
        itemGraphDexRange = randomNum(1, 100) + '%',
        itemGraphVitRange = randomNum(1, 100) + '%',
        itemId,
        itemIdNum = randomNum(1, 9999999999),
        itemIdLetter = '',
        itemResultTime = randomNum(1, 59) + ': ' + randomNum(1, 9999);

    for(var i = 0; i < 10; i++) {
        itemIdLetter += randomLetter();
    }
    itemId = itemIdNum + itemIdLetter;

    tempItem.className = 'item';

    template = template.replace(/(<span class=\"item-index-block\")\s*(>)/ig, '$1' + ' style="background-color:' + itemIndexBlockColor + '" ' + '$2');
    template = template.replace(/(<div class=\"item-num\">)\s*\d+\s*(<\/div>)/ig, '$1' + num + '$2');
    template = template.replace(/(<div class=\"item-id\">)\s*\w+\s*(<\/div>)/ig, '$1' + itemId + '$2');
    template = template.replace(/(<div class=\"item-graph-int\")\s*/ig, '$1' + ' style="width:' + itemGraphIntRange + '" ');
    template = template.replace(/(<div class=\"item-graph-dex\")\s*/ig, '$1' + ' style="width:' + itemGraphDexRange + '" ');
    template = template.replace(/(<div class=\"item-graph-vit\")\s*/ig, '$1' + ' style="width:' + itemGraphVitRange + '" ');
    template = template.replace(/(<p class=\"item-result-time\">)\s*[\s:\d]+\s*(<\/p>)/ig, '$1' + itemResultTime + '$2');

    tempItem.innerHTML = template;

    elemData.appendChild(tempItem);
}


window.onload = window.onresize = function() {

    computeColumnCount();

    var totalNum = 100,
        numPerColumn = Math.ceil(totalNum / columnCount),
        dataHeight = numPerColumn * itemHeight + 'px',
        topNums = [];

    elemData.style.height = dataHeight;

    elemData.innerHTML = '';
    appendItems(3630, totalNum);

    for (var i = 0; i < columnCount; i++) {
        topNums.push(numPerColumn * i + 1);
        document.querySelectorAll('.item')[numPerColumn * i].style.borderTop = '1px solid #999';
    }

};