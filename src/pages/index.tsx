import * as React from "react";
import { useState } from "react";
import { Link } from "gatsby";

import HeaderMenu from "../components/HeaderMenu/HeaderMenu";
import { withLayout, LayoutProps, menuItems } from "../components/Layout";
import { Segment, Header, Table } from "semantic-ui-react";
import { Dictionary, pickBy } from "lodash";
import useConfData from "../useConfData";
import { SmallTalkCard } from "../components/TalkCard";
import { SemanticCOLORS } from "semantic-ui-react/dist/commonjs/generic";
import TalkDetail from "../components/TalkDetail";
import { getTime } from "../helpers";

const SchedulePage = (props: LayoutProps) => {
  const { rooms, talks, eventData, talksGroupBySlotStart } = useConfData();
  const [displayedTalk, setDisplayedTalk] = useState<string | null>(null);

  if (rooms.length === 0 || talks.length === 0 || eventData == null) {
    return null;
  }

  return (
    <div>
      <Segment vertical inverted textAlign="center">
        <HeaderMenu
          Link={Link}
          pathname={props.location.pathname}
          items={menuItems}
          inverted
        />
      </Segment>

      {displayedTalk != null ? (
        <TalkDetail id={displayedTalk} onPress={() => setDisplayedTalk(null)} />
      ) : (
        <Segment vertical className="container">
          <Header as="h2">{`Welcome to ${
            eventData != null ? eventData?.name?.en : ""
          }!`}</Header>
          <DailyTable
            day={"Friday 17. April"}
            setDisplayedTalk={setDisplayedTalk}
            rooms={rooms}
            talksGroupBySlotStart={pickBy(
              talksGroupBySlotStart,
              (groupedTalks, key) => new Date(key).getDate() === 17
            )}
          />
          <DailyTable
            day={"Saturday 18. April"}
            setDisplayedTalk={setDisplayedTalk}
            rooms={rooms}
            talksGroupBySlotStart={pickBy(
              talksGroupBySlotStart,
              (groupedTalks, key) => new Date(key).getDate() === 18
            )}
          />
          <DailyTable
            day={"Sunday 19. April"}
            setDisplayedTalk={setDisplayedTalk}
            rooms={rooms}
            talksGroupBySlotStart={pickBy(
              talksGroupBySlotStart,
              (groupedTalks, key) => new Date(key).getDate() === 19
            )}
          />
        </Segment>
      )}
    </div>
  );
};

const DailyTable: React.FC<{
  day: string;
  rooms: any[];
  talksGroupBySlotStart: Dictionary<any[]>;
  setDisplayedTalk: (id: string) => void;
}> = ({ rooms, talksGroupBySlotStart, day, setDisplayedTalk }) => {
  return (
    <>
      <Header as="h3">{day}</Header>
      <Table>
        <Table.Header>
          <Table.HeaderCell>{"Start"}</Table.HeaderCell>
          {rooms != null &&
            rooms.map((room, index) => {
              return (
                <Table.HeaderCell>
                  <div style={{ backgroundColor: colors[index] }}>
                    {room.name.en}
                  </div>
                </Table.HeaderCell>
              );
            })}
        </Table.Header>
        <Table.Body>
          {Object.entries(talksGroupBySlotStart).map(([time, talks], index) => {
            const talk1 = talks.find(
              talk => talk.slot.room.en === rooms[0].name.en
            );
            const talk2 = talks.find(
              talk => talk.slot.room.en === rooms[1].name.en
            );
            return (
              <Table.Row>
                <Table.Cell>{getTime(time)}</Table.Cell>
                {
                  <>
                    <Table.Cell>
                      {talk1 != null && (
                        <SmallTalkCard
                          color={colors[0]}
                          title={talk1.title}
                          presenter={talk1.speakers[0].name}
                          track={talk1.track}
                          onPress={() => setDisplayedTalk(talk1.code)}
                        >
                          {talk1.title}
                        </SmallTalkCard>
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      {talk2 != null && (
                        <SmallTalkCard
                          color={colors[1]}
                          title={talk2.title}
                          presenter={talk2.speakers[0].name}
                          track={talk2.track}
                          onPress={() => setDisplayedTalk(talk1.code)}
                        >
                          {talk2.title}
                        </SmallTalkCard>
                      )}
                    </Table.Cell>
                  </>
                }
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
};

const colors: SemanticCOLORS[] = ["teal", "olive"];

const getDay = (date: string) => {
  return new Date(date).getDay();
};
export default withLayout(SchedulePage);
