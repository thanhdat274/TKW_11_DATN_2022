import useSWR from "swr";
import instance from "../api/instance";

const fetcher = async (url) => await instance.get(url);

const endpoint = "/banners";

const useBanner = () => {
  const { data, error, mutate } = useSWR(endpoint, fetcher, {
    refreshInterval: 5000,
  });

  return {
    data,
    error,
    mutate,
  };
};

export default useBanner;
