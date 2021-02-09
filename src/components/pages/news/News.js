import React, {lazy, Suspense, useContext, useEffect, useState} from "react";
import axios from "axios";
import styled from "styled-components";
import AddNewsModal from "../../modals/AddNewsModal";
import {useParams} from "react-router-dom";

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";
import {DataPackContext} from "../../contexts/DataPackContext";
import {hasRole} from "../../util/Auth";

const NewsStyle = styled.div`

  .newsDetails {
    background: rgba(9, 8, 8, 0.6);
    padding: 1% 0;
    margin-bottom: 1%;
  }

  .newsDetails h2, p, h5 {
    color: white;
    margin: 0 1.2% 1%;
  }

  .newsDetails h5 {
    font-size: 0.7em;
  }

  .right {
    text-align: right;
  }

  .editButton, .deleteButton {
    color: yellow;
    padding: 0 1%;
    outline: none;
  }

`

const usePrefetch = (factory) => {
    const [component, setComponent] = useState(null);

    useEffect(() => {
        factory();
        const comp = lazy(factory);
        setComponent(comp);
    }, [factory]);
    return component;
}

const deleteNewsModal = () => import("../../modals/DeleteModal");
const editNewsModal = () => import("../../modals/EditNewsModal")

const News = () => {

    const {
        newsIsDeleted, setNewsIsDeleted,
        newsIsEditable, setNewsIsEditable,
        isShown, setIsShown,
        refresh, setRefresh
    } = useContext(DataPackContext)

    const {locationName} = useParams();
    const [news, setNews] = useState([]);
    const [selectedId, setSelectedId] = useState(0);

    const DeleteModal = usePrefetch(deleteNewsModal);
    const EditModal = usePrefetch(editNewsModal);

    const handleClick = (modalType, id) => {
        if (modalType === "edit") {
            setNewsIsEditable(true);
        } else {
            setIsShown(true);
        }
        setSelectedId(id);
    }

    useEffect(() => {
        setSelectedId(0);
        axios.get(`${process.env.REACT_APP_API_URL}/news/get_location_news`,
            {params: {locationName: locationName.split("_").join(" ")}})
            .then((response) => {
                setNews(response.data);
                setNewsIsDeleted(false);
                setRefresh(false);
            })
    }, [newsIsDeleted, refresh])

    return (
        <NewsStyle>
            <div className="contentList">
                <h1>Hírek</h1>
                {hasRole(["admin"]) && <div id="addNews">
                    <AddNewsModal />
                </div>}
                <div className="newsList">
                    {news.map((tempNews, index) => (
                        <div key={`postedNews${tempNews["id"]}`}
                             className={`newsDetails ${index % 2 === 0 ? "left" : "right"}`}>
                            <h2>{tempNews["title"]}</h2>
                            <h5>{tempNews["posted"]}</h5>
                            <p>{tempNews["description"]}</p>
                            <div className="menageNews">
                                {hasRole(["admin"]) &&
                                <>
                                    <IconButton
                                        className="editButton"
                                        id={`edit-news-${tempNews["title"]}`}
                                        onClick={() => { handleClick("edit", tempNews["id"]);
                                            // setNewsIsEditable(true);
                                            // setSelectedId(tempNews["id"]);
                                        }}
                                    >
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton
                                        className="deleteButton"
                                        id={`delete-news-${tempNews["title"]}`}
                                        onClick={() => {handleClick("delete", tempNews["id"]);}}
                                    >
                                        <DeleteIcon/>
                                    </IconButton>
                                </>
                                }
                                <Suspense fallback={<h1>Loading...</h1>}>
                                    {isShown && selectedId === tempNews["id"] &&
                                    <DeleteModal id={selectedId} name={tempNews["title"]} url="news"/>}
                                    {newsIsEditable && selectedId === tempNews["id"] &&
                                    <EditModal news={tempNews} />}
                                </Suspense>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </NewsStyle>
    )
}

export default News;