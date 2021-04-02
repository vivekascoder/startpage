// Some JS {Bloated} for startpage.

let query_url = "https://www.google.com/search?q="

let search = document.querySelector("#query")
let logo = document.querySelector("#search_logo")
let autoComplete = document.querySelector("#auto-complete")
let query = ""


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
            <span class="name">[<span class="selected">${query}</span>${restString}] ${searchEngines[key].url}</span>
        </div>
        `
    }
    return engineTemplate
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
        autoComplete.innerHTML = engineHtmlGenerator(search.value, searchEngines)
    }
    if (e.code == "Enter" && search.value) {
        query_url += search.value.replaceAll(" ", "+")
        window.location = query_url
    }
    if (e.code == "Tab") {
        if (Object.keys(searchEngines).find((value) => value == query.slice(1))) {
            logo.innerHTML = searchEngines[query.slice(1)].icon
            query_url = searchEngines[query.slice(1)].url
            search.value = ""
            autoComplete.innerHTML = ""
        }
    }
})