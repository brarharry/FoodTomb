import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

// spinners import stuff
import { css } from "@emotion/react";
import FadeLoader from "react-spinners/FadeLoader";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
// end spinners import stuff

export default function Enter(props) {
  let params = useParams();
  let history = useHistory();
  console.log("in enter");

  useEffect(() => {
    console.log("in enter");
    //debugger;
    console.log(props);
    //FIGURE OUT LATER
    //props.signIn(params.email, params.link);
    history.push("/refrigerator");
    console.log("in enter 2");
  }, []);

  return (
    <div>
      <p>Verifying your magic link</p>
      <FadeLoader color={"black"} loading={true} css={override} size={50} />
    </div>
  );
}
