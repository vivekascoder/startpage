// Some JS {Bloated} for startpage.

const ls = {
    get: function(key) {
        let latestSECode = localStorage.getItem(key)
        return latestSECode
    },
    set: function(key, value) {
        localStorage.setItem(key, value)
    }
}


let query_url
let search = document.querySelector("#query")
let logo = document.querySelector("#search_logo")
let autoComplete = document.querySelector("#auto-complete")
let query = ""
query.
let currentCode = ""
let engineIndex = 0
let totalSelectedEngines = Object.keys(searchEngines).length
let currentFilteredEngnes = searchEngines

const engineHtmlGenerator = (query, searchEngines) => {
    let engineTemplate = ""
    let filteredItems = Object.keys(searchEngines).filter((value) => {
        return value.startsWith(query.slice(1))
    })

    for (let i = 0; i < filteredItems.length; i++) {
        let key = filteredItems[i]
        let restString = (":" + key).replace(query, "")
        engineTemplate += `
        <div class="engine">
            <span class="logo">${searchEngines[key].icon}</span>
            <span class="name">[<span class="selected">
				${query}</span>${restString}] ${searchEngines[key].url}
			</span>
        </div>
        `

    }
    return [engineTemplate, filteredItems.length]
}


search.focus()
search.addEventListener("keydown", (e) => {
    if (e.code == "Tab") {
        e.preventDefault()
    }
})

search.addEventListener("keyup", (e) => {
    query = search.value
    autoComplete.innerHTML = ""
    if (search.value.startsWith(":") && !search.value.match(" ")) {
        currentFilteredEngnes = Object.filter()
		let data = engineHtmlGenerator(search.value, searchEngines)
        autoComplete.innerHTML = data[0]
        totalSelectedEngines = data[1]
		// Will fill the innerHTML of the div.
		totalSelectedEngines = data[1]
        autoComplete.innerHTML += `
        <style>
             .engine:nth-child(${engineIndex+1}) {
                background: var(--background-alt);
                overflow: hidden;
            }
        </style>
        `
		autoComplete.style.display = "block";
    }


    if (e.code == "Enter" && search.value) {

        if (search.value.startsWith(":") && !search.value.match(" ")) {
            // Object.keys()
            engineData = searchEngines[engineIndex]
            console.log(engineData)
        }
        else {
            query_url += search.value.replaceAll(" ", "+")

            let currentCache = JSON.parse(ls.get(`cache_${currentCode}`))
            if(!currentCache) currentCache = []
            currentCache.push(search.value)
            currentCache = JSON.stringify(currentCache)
            ls.set(`cache_${currentCode}`, currentCache)

            window.location = query_url
        }
    }
    if (e.code == "Tab") {
        let code = query.slice(1)
        currentCode = code
        let engineData = searchEngines[code]

		autoComplete.style.display = "none";
		let matchingKeys = Object.keys(searchEngines)
            .filter( (key) => key.startsWith(code) )

		if (matchingKeys.length == 1) {
			engineData = searchEngines[matchingKeys[0]]
		}
        if (engineData) {
            ls.set('latest', query.slice(1))
            logo.innerHTML = engineData.icon
            query_url = engineData.url
            search.value = ""
            autoComplete.innerHTML = ""
        }
    }
	if (e.code == "ArrowDown") {
		if (engineIndex < totalSelectedEngines) {
			engineIndex ++;	
		}
		else if (engineIndex == totalSelectedEngines) {
			engineIndex = 0;
		}
	}
	if (e.code == "ArrowUp") {
		if (engineIndex > 0) {
			engineIndex --;	
		}
		else if (engineIndex == 0) {
			engineIndex = totalSelectedEngines;
		}
	}
})

document.addEventListener('DOMContentLoaded', () => {
    let latestEngineData = searchEngines[ls.get('latest')]
    let defaultEngineData = searchEngines[ls.get('default')]

    currentCode = ls.get('default') || ls.get('latest')
    let firstEngine = defaultEngineData || latestEngineData

    query_url = firstEngine?.url || 'https://www.google.com/search?q='
    logo.innerHTML = firstEngine.icon
})
