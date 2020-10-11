const fetchSpeakers = async () => {
  const resp = await fetch(
    "https://pretalx.com/api/events/democon/speakers/?limit=25&offset=25"
  );
  const json = await resp.json();
  return json;
};

const fetchConf = async () => {
  const resp = await fetch("https://pretalx.com/api/events/democon/");
  const json = await resp.json();
  return json;
};

const fetchTalks = async () => {
  const resp = await fetch("https://pretalx.com/api/events/democon/talks/");
  const json = await resp.json();
  return json;
};

export default { fetchSpeakers, fetchConf, fetchTalks };
