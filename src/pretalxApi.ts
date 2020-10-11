const fetchSpeakers = async () => {
  const resp = await fetch(
    "https://pretalx.com/api/events/democon/speakers/?limit=25&offset=25"
  );
  const json = await resp.json();
  return json.results;
};

const fetchConf = async () => {
  const resp = await fetch("https://pretalx.com/api/events/democon/");
  const json = await resp.json();
  return json;
};

const fetchTalks = async () => {
  const resp = await fetch("https://pretalx.com/api/events/democon/talks/");
  const json = await resp.json();
  return json.results;
};

const fetchRooms = async () => {
  const resp = await fetch("https://pretalx.com/api/events/democon/rooms/");
  const json = await resp.json();
  return json.results;
};

export default { fetchSpeakers, fetchConf, fetchTalks, fetchRooms };
