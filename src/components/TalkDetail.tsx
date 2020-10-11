import * as React from "react";

import { Segment, Header } from "semantic-ui-react";
import { getTime } from "../helpers";
import useConfData from "../useConfData";
import { LargeTalkCard } from "./TalkCard";

const TalkDetail: React.FC<{ id: string; onPress: () => void }> = props => {
  const { talks, eventData } = useConfData();
  if (talks.length === 0) return null;
  const talk = talks.find(talk => talk.code === props.id);

  return (
    <div>
      <Segment vertical className="container">
        <Header as="h2">{`Welcome to ${
          eventData != null ? eventData?.name?.en : ""
        }!`}</Header>
      </Segment>

      <Segment className="container">
        <div style={{ cursor: "pointer" }} onClick={props.onPress}>
          {"Back"}
        </div>
        <LargeTalkCard
          onPress={props.onPress}
          title={talk.title}
          speaker={talk.speakers[0].name}
          description={talk.description}
          abstract={talk.abstract}
          footer={`${talk.slot.room.en} • ${getTime(
            talk.slot.start
          )} - ${getTime(talk.slot.end)}`}
        />
      </Segment>
    </div>
  );
};

export default TalkDetail;
