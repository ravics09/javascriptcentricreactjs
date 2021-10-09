import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";
import fullArticleStyle from "./fullArticle.module.css";
import { Container, Row, Col, Button, Card, Image } from "react-bootstrap";
import LEADER_IMG from "./../../assets/images/leader.jpeg";
import PLACEHOLDER_IMG from "./../../assets/images/h1.png";
import COVERIMAGE from "./../../assets/images/coverImage.jpeg";
import { FaHeart, FaRegComment } from "react-icons/fa";

const API_URL = "http://localhost:9090/user";

const FullArticle = () => {
  const history = useHistory();
  const [postData, setPostData] = useState({});
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const { state } = history.location;
    setPostData(state.data);
    const userId = state.data.userId;
    const url = `${API_URL}/profile/${userId}/`;

    axios.get(url).then(
      (response) => {
        if (response.data.statusCode === 200) {
          setUserDetails(response.data.user);
        }
      },
      (error) => {}
    );
  }, []);

  const joinedDate = moment(postData.createdAt).format("LL");
  return (
    <Container className={fullArticleStyle.container}>
      <Row className="mb-3">
        <Col md={1}>
          <Row className={fullArticleStyle.firstColumn}>this</Row>
        </Col>
        <Col md={9}>
          {postData.coverImage ? (
            <Row>
              <Image src={postData.coverImage} width={100} height={100} />
            </Row>
          ) : (
            <Row>
              <Image src={COVERIMAGE} width={100} height={300} />
            </Row>
          )}

          <Row className={fullArticleStyle.secondColumn}>
            <div className={fullArticleStyle.cardHeader}>
              <Image
                src={userDetails.profilePic ? LEADER_IMG : PLACEHOLDER_IMG}
                width={50}
                height={50}
                roundedCircle
              />
              <div className={fullArticleStyle.cardName}>
                <strong>{postData.fullName}</strong>
                <p>Posted on 5 Oct</p>
              </div>
            </div>
            <div className={fullArticleStyle.cardTitle}>
              <b>
                <h1>{postData.postTitle}</h1>
              </b>
            </div>
            <div className={fullArticleStyle.cardSubtitle}>
              <article>
                <p>{postData.postContent}</p>
              </article>
            </div>
          </Row>
        </Col>
        <Col md={2}>
          <Row className={fullArticleStyle.thirdColumn}>
            <Card style={{ width: "100%" }}>
              <Card.Img
                variant="top"
                src={userDetails.profilePic ? LEADER_IMG : PLACEHOLDER_IMG}
              />
              <Card.Body>
                <Card.Title>{userDetails.fullName}</Card.Title>
                <Card.Text>
                  <p>
                    <strong>Location</strong>
                  </p>
                  {userDetails.location ? userDetails.location : "Dewas"}
                </Card.Text>
                <Card.Text>
                  <p>
                    <strong>Work</strong>
                  </p>
                  {userDetails.work}
                </Card.Text>
                <Card.Text>
                  <p>
                    <strong>Joined On</strong>
                  </p>{" "}
                  {joinedDate}
                </Card.Text>
              </Card.Body>
              <Card.Footer className="d-grid">
                <Button size="sm">Follow</Button>
              </Card.Footer>
            </Card>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
export default FullArticle;
