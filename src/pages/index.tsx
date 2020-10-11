import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "gatsby";

import HeaderMenu from "../components/HeaderMenu/HeaderMenu";
import { withLayout, LayoutProps, menuItems } from "../components/Layout";
import {
  Button,
  Segment,
  Container,
  Grid,
  Header,
  Icon
} from "semantic-ui-react";
import pretalxApi from "../pretalxApi";

const IndexPage = (props: LayoutProps) => {
  const [eventData, setEventData] = useState(null as any);

  useEffect(() => {
    pretalxApi.fetchConf().then(data => {
      setEventData(data);
    });
  });

  console.log(eventData);
  return (
    <div>
      {/* Master head */}
      <Segment vertical inverted textAlign="center">
        <HeaderMenu
          Link={Link}
          pathname={props.location.pathname}
          items={menuItems}
          inverted
        />
      </Segment>

      {/* About this starter */}
      <Segment vertical className="stripe">
        <Grid stackable verticalAlign="middle" className="container">
          <Grid.Row>
            <Grid.Column width="8">
              <Header>Lorem ipsum</Header>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro
                laudantium ad, quae, perspiciatis ipsa distinctio.
              </p>
              <Header>Dolor sit amet</Header>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro
                laudantium ad, quae, perspiciatis ipsa distinctio.
              </p>
            </Grid.Column>
            <Grid.Column width="6" floated="right">
              {/* TODO replace with a pretty GIF */}
              <Header>Lorem ipsum</Header>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro
                laudantium ad, quae, perspiciatis ipsa distinctio.
              </p>
              <Header>Dolor sit amet</Header>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro
                laudantium ad, quae, perspiciatis ipsa distinctio.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      {/* Key features */}
      <Segment vertical className="stripe alternate feature">
        <Grid
          columns="3"
          textAlign="center"
          divided
          relaxed
          stackable
          className="container"
        >
          <Grid.Row>
            <Grid.Column>
              <Header icon>
                <Icon name="wizard"></Icon>A kind of magic!
              </Header>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptas eaque at quae cupiditate aspernatur quibusdam!
                Distinctio quod non, harum dolorum earum molestias, beatae
                expedita aliquam dolorem asperiores nemo amet quaerat.
              </p>
            </Grid.Column>
            <Grid.Column>
              <Header icon>
                <Icon name="wizard"></Icon>A kind of magic!
              </Header>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptas eaque at quae cupiditate aspernatur quibusdam!
                Distinctio quod non, harum dolorum earum molestias, beatae
                expedita aliquam dolorem asperiores nemo amet quaerat.
              </p>
            </Grid.Column>
            <Grid.Column>
              <Header icon>
                <Icon name="wizard"></Icon>A kind of magic!
              </Header>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptas eaque at quae cupiditate aspernatur quibusdam!
                Distinctio quod non, harum dolorum earum molestias, beatae
                expedita aliquam dolorem asperiores nemo amet quaerat.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
};

export default withLayout(IndexPage);
