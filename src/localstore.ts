import pretalxApi from "./pretalxApi";

const DAY = 60 * 60 * 24;

const getSpeakers = async (noCache?: boolean) => {
  const now = Date.now();
  if (noCache) {
    return await pretalxApi.fetchSpeakers();
  } else {
    const speakers = localStorage.getItem("speakers");
    if (speakers != null && useCache()) {
      return JSON.parse(speakers);
    } else {
      const result = await pretalxApi.fetchSpeakers();
      localStorage.setItem("speakers", JSON.stringify(result));
      return result;
    }
  }
};

const getConf = async (noCache?: boolean) => {
  if (noCache) {
    return await pretalxApi.fetchConf();
  } else {
    const conf = localStorage.getItem("conf");
    if (conf != null && useCache()) {
      return JSON.parse(conf);
    } else {
      const result = await pretalxApi.fetchConf();
      localStorage.setItem("conf", JSON.stringify(result));
      return result;
    }
  }
};

const getTalks = async (noCache?: boolean) => {
  if (noCache) {
    return await pretalxApi.fetchTalks();
  } else {
    const talks = localStorage.getItem("talks");
    if (talks != null && useCache()) {
      return JSON.parse(talks);
    } else {
      const result = await pretalxApi.fetchTalks();
      localStorage.setItem("talks", JSON.stringify(result));
      return result;
    }
  }
};

const getRooms = async (noCache?: boolean) => {
  if (noCache) {
    return await pretalxApi.fetchRooms();
  } else {
    const rooms = localStorage.getItem("rooms");
    if (rooms != null && useCache()) {
      return JSON.parse(rooms);
    } else {
      const result = await pretalxApi.fetchRooms();
      localStorage.setItem("rooms", JSON.stringify(result));
      return result;
    }
  }
};

const useCache = () => {
  const now = Date.now();

  const timestamp = localStorage.getItem("timestamp");
  const lastFetch = Number.parseInt(timestamp);

  return lastFetch < now - DAY;
};

export default { getSpeakers, getConf, getTalks, getRooms };
