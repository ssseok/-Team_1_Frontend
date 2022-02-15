import styled from "styled-components";
import React, { useEffect } from "react";
import Template from "../common/Template";
import { Grid, Image, Text } from "../common";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getInspireByIdFB } from "../module/inspire";
import { useSelector } from "react-redux";

const InspireItemPageBlock = styled.div`
  width: 100%;
  .number_list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .number_item {
    cursor: pointer;
  }
  span {
    display: block;
    width: calc((100%-48px) / 9);
    height: 32px;
    background: white;
    color: #252525;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 2px;
  }
`;

const InspireItemPage = () => {
  const inspire_id = useParams().id;
  const dispatch = useDispatch();
  const inspire_list = useSelector(({ inspire }) => inspire.list);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getInspireByIdFB(inspire_id));
  }, []);

  return (
    <Template>
      <InspireItemPageBlock>
        <Grid margin="0 0 2em 0">
          <Text size="1.5rem" bold="500">
            <b className="user_name">야울해</b> 님의 <br />
            디자인 노트
          </Text>
        </Grid>
        <Grid width="100%" margin="0 0 2.5em 0">
          <Image
            shape="rectangle"
            rectangle_size="55%"
            src={inspire_list[0]?.image_url}
          />
        </Grid>
        <Grid>
          <Text margin="0 0 1em 0" bold="500">
            영감일지
          </Text>
          <div className="number_list">
            {inspire_list[0].memos.map((n, idx) => {
              return (
                <span
                  className="number_item"
                  key={idx}
                  onClick={() =>
                    navigate(`/inspire_list/${inspire_id}/memos_list/${n._id}`)
                  }
                >
                  {idx + 1}
                </span>
              );
            })}
          </div>
        </Grid>
      </InspireItemPageBlock>
    </Template>
  );
};

export default InspireItemPage;
