import { Link } from "gatsby";
import * as React from "react";
import { FC } from "react";
import { Card, Feed } from "semantic-ui-react";
import { SemanticCOLORS } from "semantic-ui-react/dist/commonjs/generic";

export const SmallTalkCard: FC<{
  title: string;
  presenter: string;
  track: string;
  color?: SemanticCOLORS;
  onPress: () => void;
}> = props => {
  return (
    <div style={{ cursor: "pointer" }} onClick={props.onPress}>
      <Card
        color={props.color}
        header={props.title}
        meta={props.track}
        description={props.presenter}
      />
    </div>
  );
};

export const LargeTalkCard: FC<{
  title: string;
  speaker: string;
  description: string;
  abstract: string;
  footer: string;
  onPress: () => void;
}> = props => {
  return (
    <Card
      fluid={true}
      header={props.title}
      meta={props.speaker}
      description={props.abstract}
    >
      <Card.Content>
        <Card.Header>{props.title}</Card.Header>
      </Card.Content>
      <Card.Content>
        <Feed.Content>{props.speaker}</Feed.Content>
        <Feed.Content>{props.description}</Feed.Content>
      </Card.Content>
      <Card.Content extra>{props.footer}</Card.Content>
    </Card>
  );
};
