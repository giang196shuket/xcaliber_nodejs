function createPagerHTML(totalCount, rowPerPage, currentPage, pageBlockCount, callBack) {
    console.log(totalCount, rowPerPage);
    let totalPage = Math.floor(totalCount / (rowPerPage + (currentPage == 1 ? 3 : 0) )); //Total number of pages: Total number of record/row count +1
            if(totalPage < 1) totalPage = 1;
            if (totalCount % rowPerPage > 0) totalPage++;
            if(totalCount <= rowPerPage) totalPage-- // 
            let startPage = pageBlockCount * Math.floor((currentPage - 1) / pageBlockCount) + 1; //Pager's home page
            
            // let currentBlock = Math.floor((currentPage - 1) / pageBlockCount) + 1; //Current page block
            // let lastBlock = Math.floor((totalPage - 1) / pageBlockCount) + 1; //last page block
            // let hasBeforeBlock = currentBlock <= 1 ? false : true; //Previous block status
            // let hasNextBlock = currentBlock >= lastBlock ? false : true; //Next block status

            let callBacks = callBack.split(":");
            let callBacksArg = "";
            if (callBacks.length > 1) {
                for (let i = 1; i < callBacks.length; i++) {
                    callBacksArg += `, '${callBacks[i]}' `;
                }
            }
            let pageHtml = "";
    
            if (currentPage > 1)  {
                pageHtml += `<li class="page-item"><a class="page-link" style="cursor: pointer" onclick="${callBacks[0]}(${1},${rowPerPage}${
                    callBacksArg != "" ? callBacksArg : ""
                })">❮❮</a></li>`;
            }else {
                pageHtml += `<li class="page-item disabled"><a class="page-link">❮❮</a></li>`;
            }
            if (currentPage > 1)  {
                pageHtml += `<li class="page-item"><a class="page-link" style="cursor: pointer" onclick="${callBacks[0]}(${currentPage - 1},${rowPerPage}${(callBacksArg != "") ? callBacksArg : ''})">❮</a></li>`;
            }else {
                pageHtml += `<li class="page-item disabled"><a class="page-link">❮</a></li>`;
            }
            for (var pg = 0; pg < pageBlockCount; pg++) {
                console.log("bpage", startPage + pg)
                console.log("totalPage", totalPage)
                console.log("currentPage", currentPage)
                console.log("currentPage", currentPage)

                if (startPage + pg > totalPage) break;
                var bpage = startPage + pg;
                if (currentPage == bpage) {
                    pageHtml += `<li class="page-item active"><a class="page-link">${bpage}</a></li>`;
                } else {
                    pageHtml += `<li class="page-item"><a class="page-link" style="cursor: pointer" onclick="${callBacks[0]}(${bpage},${rowPerPage}${
                        callBacksArg != "" ? callBacksArg : ""
                    })">${bpage}</a></li>`;
                }
            }
            if (currentPage < totalPage) {
                pageHtml += `<li class="page-item"><a class="page-link" style="cursor: pointer" onclick="${callBacks[0]}(${currentPage + 1},${rowPerPage}${
                    callBacksArg != "" ? callBacksArg : ""
                })">❯</a></li>`;
            } else {
                pageHtml += `<li class="page-item disabled"><a class="page-link">❯</a></li>`;
            }

            if (currentPage < totalPage) {
                pageHtml += `<li class="page-item"><a class="page-link" style="cursor: pointer" onclick="${callBacks[0]}(${totalPage},${rowPerPage}${
                    callBacksArg != "" ? callBacksArg : ""
                })">❯❯</a></li>`;
            } else {
                pageHtml += `<li class="page-item disabled"><a class="page-link">❯❯</a></li>`;
            }

            return pageHtml;
}