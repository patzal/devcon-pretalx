import pretalxApi from "./pretalxApi";

const DAY = 60 * 60 * 24;

const getSpeakers = async (noCache?: boolean) => {
  const now = Date.now();
  if (noCache) {
    return await pretalxApi.fetchSpeakers();
  } else {
    const speakers = localStorage.getItem("speakers");
    if (speakers != null && useCache("speakers")) {
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
    if (conf != null && useCache("conf")) {
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
    if (talks != null && useCache("talks")) {
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
    if (rooms != null && useCache("rooms")) {
      return JSON.parse(rooms);
    } else {
      const result = await pretalxApi.fetchRooms();
      localStorage.setItem("rooms", JSON.stringify(result));
      return result;
    }
  }
};

const useCache = (resource: string) => {
  const now = Date.now();

  const timestamp = localStorage.getItem(`timestamp-${resource}`);
  const lastFetch = Number.parseInt(timestamp);

  const useCacheFlag = lastFetch > now - DAY;
  if (useCacheFlag === false) {
    localStorage.setItem(`timestamp-${resource}`, now.toString());
  }
  return useCacheFlag;
};

export default { getSpeakers, getConf, getTalks, getRooms };
