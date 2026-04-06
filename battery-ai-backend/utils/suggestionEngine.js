export const getSuggestions = (data)=>{

  let suggestions = [];

  if(data.batteryLevel < 20){
    suggestions.push("Avoid draining battery below 20%");
  }

  if(data.charging && data.batteryLevel > 90){
    suggestions.push("Avoid charging above 90%");
  }

  if(data.cpuUsage > 70){
    suggestions.push("High CPU usage draining battery");
  }

  return suggestions;

}