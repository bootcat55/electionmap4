const map = d3.select("#map");
const elCounties = map.select("#counties");
var sliderValue = localStorage.getItem("sliderValue");
if (!sliderValue) {
  sliderValue = 0;
}
var slider = document.getElementById("slider-container");

slider.addEventListener("input", function() {
  sliderValue = this.value;
  localStorage.setItem("sliderValue", sliderValue);
  console.log("Slider moved to:", this.value);
});

function getSliderValue() {
  return sliderValue;
}

function filterElements(titleEnd) {
  matchingElements = elCounties.selectAll("path").filter(function(){
      return d3.select(this).select("title").text().endsWith(titleEnd);
  });
  nonMatchingElements = elCounties.selectAll("path").filter(function(){
      return !d3.select(this).select("title").text().endsWith(titleEnd);
  });
  nonMatchingElements.attr("d", null);
}

function transformElements() {
  matchingElements.attr("transform", "scale(2)")
  matchingElements.each(function() {
     console.log(d3.select(this).select("title").text());
  });
}

elCounties.on("click", function(event) {
  if (d3.select(event.target).node().parentNode === elCounties.node()) {
    var title = d3.select(event.target).select("title").text();
    var titleEnd = title.slice(-2);
    filterElements(titleEnd);
    transformElements();

    var sliderValue = getSliderValue();
    console.log("Slider Value:", sliderValue, "Slider Element Value:", slider.value);

    if (sliderValue > 50) {
      d3.select(event.target).style("fill", "red");
    } else {
      d3.select(event.target).style("fill", "blue");
    }
    d3.select("#slider-container").classed("hide-slider", !d3.select("#slider-container").classed("hide-slider"));
  }
});
