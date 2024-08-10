chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "downloadLogos") {
    downloadCompanyLogos();
  }
});

function downloadCompanyLogos() {
  const companies = [];
  const companyNamesMainDiv =
    document.getElementsByClassName("wp-block-heading");
  const companyImageMainDiv = document.getElementsByClassName("wp-block-image");

  for (let i = 0; i < companyNamesMainDiv.length; i++) {
    companies[i] = {
      name: companyNamesMainDiv[i].innerText,
    };
  }

  for (let i = 0; i < companyImageMainDiv.length; i++) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = companyImageMainDiv[i].innerHTML;
    const imgElement = tempDiv.querySelector("img");
    const imgSrc = imgElement ? imgElement.src : "";
    companies[i] = { ...companies[i], image: imgSrc };
  }

  companies.forEach((company, index) => {
    if (company.image) {
      chrome.runtime.sendMessage({
        action: "download",
        url: company.image,
        filename: `${company.name || `company_${index}`}.png`,
      });
    }
  });
  chrome.runtime.sendMessage({
    action: "download",
    url: logoUrl,
    filename: logoName,
  });
}
