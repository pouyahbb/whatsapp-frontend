import React, { useEffect, useState } from "react";
import ReturnIcon from "../../../svg/Return";
import SearchIcon from "../../../svg/Search";
import FilterIcon from "../../../svg/FilterIcon";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "../../../hooks/useDebounce";
import { logout } from "../../../features/user.slice";
import { useNavigate } from "react-router-dom";

const Search = ({
  searchTerm,
  setSearchTerm,
  setLoading,
  searchLength,
  setSearchResults,
  loading,
}) => {
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const [show, setShow] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (debouncedSearchTerm) {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/user?search=${debouncedSearchTerm}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );
        setSearchResults(data);
        setLoading(false);
      } catch (error) {
        console.log(error.response.data.error.message);
        if (error.response.data.error.message === "Unauthorized") {
          dispatch(logout());
          setLoading(false);
          navigate("/login");
        }
      }
    } else {
      setSearchResults([]);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (debouncedSearchTerm) {
      handleSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm, user.access_token]);
  return (
    <div className="h-[49px] py-1.5">
      <div className="px-[10px]">
        <div className="flex items-center gap-x-2">
          <div className="w-full flex dark:bg-dark_bg_2 rounded-lg pl-2">
            {show || searchLength > 0 ? (
              <span
                className="w-8 flex items-center justify-center rotateAnimation cursor-pointer"
                onClick={() => setSearchResults([])}
              >
                <ReturnIcon className="fill-green_1 w-5" />
              </span>
            ) : (
              <span className="w-8 flex items-center justify-center rotateAnimation">
                <SearchIcon className="dark:fill-dark_svg_2 w-5" />
              </span>
            )}
            <input
              type="text"
              value={searchTerm}
              placeholder="Search or start a new chat"
              className="input"
              onFocus={() => setShow(true)}
              onBlur={() => searchLength === 0 && setShow(false)}
              onKeyDown={(e) => handleSearch(e)}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                if (!loading) {
                  setLoading(true);
                }
              }}
            />
          </div>
          <button className="btn">
            <FilterIcon className="dark:fill-dark_svg_2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
