import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "gatsby";

import HeaderMenu from "../components/HeaderMenu/HeaderMenu";
import { withLayout, LayoutProps, menuItems } from "../components/Layout";
import { Segment, Grid, Header, Icon, Table } from "semantic-ui-react";
import localstore from "../localstore";
import { chain, Dictionary, filter, pickBy } from "lodash";

const IndexPage = (props: LayoutProps) => {
  const [eventData, setEventData] = useState(null as any);
  const [talks, setTalks] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    localstore.getConf(true).then(data => {
      setEventData(data);
    });
    localstore.getTalks(true).then(data => setTalks(data));
    localstore.getRooms(true).then(data => setRooms(data));
  }, [localstore, setEventData]);

  console.log(eventData);
  console.log(talks);

  const talksGroupBySlotStart = chain(talks)
    .sortBy(talk => talk.slot.start)
    .groupBy(talk => talk.slot.start)
    .value();
  // const talksArray = Object.entries(talksGroupBySlotStart);
  console.log(talksGroupBySlotStart);

  if (rooms.length === 0 || talks.length === 0 || eventData == null)
    return null;
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

      <Segment vertical className="container">
        <Header as="h2">{`Welcome to ${
          eventData != null ? eventData?.name?.en : ""
        }!`}</Header>
        <DailyTable
          day={"Friday 17. April"}
          talks={talks}
          rooms={rooms}
          talksGroupBySlotStart={pickBy(
            talksGroupBySlotStart,
            (groupedTalks, key) => new Date(key).getDate() === 17
          )}
        />
        <DailyTable
          day={"Saturday 18. April"}
          talks={talks}
          rooms={rooms}
          talksGroupBySlotStart={pickBy(
            talksGroupBySlotStart,
            (groupedTalks, key) => new Date(key).getDate() === 18
          )}
        />
        <DailyTable
          day={"Sunday 19. April"}
          talks={talks}
          rooms={rooms}
          talksGroupBySlotStart={pickBy(
            talksGroupBySlotStart,
            (groupedTalks, key) => new Date(key).getDate() === 19
          )}
        />
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

const DailyTable: React.FC<{
  day: string;
  rooms: any[];
  talksGroupBySlotStart: Dictionary<any[]>;
  talks: any[];
}> = ({ rooms, talksGroupBySlotStart, day, talks }) => {
  return (
    <>
      <Header as="h3">{day}</Header>
      <Table>
        <Table.Header>
          <Table.HeaderCell>{"Start"}</Table.HeaderCell>
          {rooms != null &&
            rooms.map(room => {
              return <Table.HeaderCell>{room.name.en}</Table.HeaderCell>;
            })}
        </Table.Header>
        <Table.Body>
          {Object.entries(talksGroupBySlotStart).map(([time, talks]) => {
            console.log(rooms[0].name.en);
            console.log(talks[0].slot.room.en);
            return (
              <Table.Row>
                <Table.Cell>{getTime(time)}</Table.Cell>
                {
                  <>
                    <Table.Cell>
                      {
                        talks.find(
                          talk => talk.slot.room.en === rooms[0].name.en
                        )?.title
                      }
                    </Table.Cell>
                    <Table.Cell>
                      {
                        talks.find(
                          talk => talk.slot.room.en === rooms[1].name.en
                        )?.title
                      }
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
const getTime = (date: string) => {
  return new Date(date).toLocaleTimeString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit"
  });
};

const getDay = (date: string) => {
  return new Date(date).getDay();
};
export default withLayout(IndexPage);
