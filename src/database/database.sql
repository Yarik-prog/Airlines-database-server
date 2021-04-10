CREATE DATABASE airlines

/*psql \! chcp 1251*/
/*---------------------------------------------------------------------*/
CREATE TABLE flight(
    flight_id serial UNIQUE,
    flight_num integer,
    dep_date timestamp,
    route_id integer,
    tail_code varchar(255),
    add_luggage float,
    terminal_id integer,
    runaway varchar(255),
    flight_status varchar(255),
    PRIMARY KEY (flight_num, dep_date),
    FOREIGN KEY(route_id) 
	  REFERENCES route(route_id)
      ON DELETE CASCADE,
    FOREIGN KEY(tail_code) 
	  REFERENCES plane(tail_code)
      ON DELETE SET NULL,
    FOREIGN KEY(terminal_id) 
	  REFERENCES terminal(terminal_id)
     ON DELETE SET NULL
);

CREATE TABLE route(
    route_id SERIAL UNIQUE,
    dep_airport varchar(255),
    arrive_airport varchar(255),
    dep_country varchar(255),
    arrive_country varchar(255),
    route_status varchar(255),
    PRIMARY KEY (dep_airport, arrive_airport),
    CHECK(dep_airport <> arrive_airport)
);
CREATE TABLE terminal(
    terminal_id SERIAL UNIQUE,
    name_terminal varchar(255),
    gate varchar(255),
    PRIMARY KEY (name_terminal,gate)
);
/*---------------------------------------------------------------------*/
CREATE TABLE plane(
    plane_id SERIAL,
    tail_code varchar(255) UNIQUE,
    name_plane varchar(255),
    model varchar(255),
    seats_count integer,
    flight_range_km integer,
    crew_num integer NULL,
    plane_condition varchar(255),
    PRIMARY KEY (name_plane,model,tail_code),
    FOREIGN KEY(crew_num) 
	  REFERENCES crew(crew_num)
        ON DELETE SET NULL
);
CREATE TABLE tail_number(
   tail_code varchar(255),
   aviacompany_name varchar(255),
   PRIMARY KEY (tail_code),
   FOREIGN KEY(tail_code) 
	  REFERENCES plane(tail_code)
        ON DELETE CASCADE
);
/*---------------------------------------------------------------------*/
CREATE TABLE crew(
    crew_id serial,
    crew_num integer,
    type_crew varchar(255),
    PRIMARY KEY (crew_num)
);
CREATE TABLE staff(
   staff_id serial UNIQUE,
   fullname_staff varchar(255),
   work_position varchar(255),
   crew_num integer,
   flight_hours integer,
    PRIMARY KEY (fullname_staff, work_position),
    FOREIGN KEY(crew_num) 
	  REFERENCES crew(crew_num)
    ON DELETE SET NULL
);
CREATE TABLE plane_maintenance(
   plane_maintenance_id serial,
   event_date timestamp,
   service_crew_num integer,
   tail_code varchar(255),
   result varchar(255),
    PRIMARY KEY (event_date,tail_code),
    FOREIGN KEY(service_crew_num) 
	  REFERENCES crew(crew_num)
       ON DELETE CASCADE,
    FOREIGN KEY(tail_code) 
	  REFERENCES tail_number(tail_code)
       ON DELETE CASCADE
);
/*---------------------------------------------------------------------*/
CREATE TABLE passenger(
    passenger_id serial UNIQUE,
    fullname_passenger varchar(255),
    book_date timestamp,
    passport_number integer,
    phone_number varchar(255),
    ticket_num integer,
    visa varchar(255),
    PRIMARY KEY (fullname_passenger,book_date)
);
CREATE TABLE lugagge(
    luggage_code varchar(255),
    weight_kg float,
    passenger_id integer,
    PRIMARY KEY (luggage_code),
    FOREIGN KEY(passenger_id) 
	  REFERENCES passenger(passenger_id)
       ON DELETE CASCADE
);
CREATE TABLE ticket(
   ticket_id serial UNIQUE,
   ticket_num integer UNIQUE,
   seat_num integer,
   cost_ua float,
   class varchar(255),
   ticket_status varchar(255),
   passenger_id integer,
    PRIMARY KEY (ticket_num,seat_num),
    FOREIGN KEY(passenger_id) 
	  REFERENCES passenger(passenger_id)
      ON DELETE CASCADE
);
CREATE TABLE transfer(
    flight_id integer,  
    ticket_id integer,  
    PRIMARY KEY (flight_id, ticket_id),
    FOREIGN KEY(flight_id) 
	  REFERENCES flight(flight_id)
      ON DELETE CASCADE,
    FOREIGN KEY(ticket_id) 
	  REFERENCES ticket(ticket_id)
      ON DELETE CASCADE
);
/*---------------------------------------------------------------------*/
CREATE TABLE avia_company(
   avia_company_id serial UNIQUE,
   name_company varchar(255),
   country_location varchar(255),
   PRIMARY KEY (name_company,country_location)
);
CREATE TABLE address_head_office(
   address_id serial,
   address varchar(255),
   phone_head_office varchar(255),
   avia_company_id integer,
    PRIMARY KEY (address_id),
    FOREIGN KEY(avia_company_id) 
	  REFERENCES avia_company(avia_company_id)
     ON DELETE CASCADE
);
/*---------------------------------------------------------------------*/

INSERT INTO route(dep_airport, arrive_airport, dep_country, arrive_country, route_status)
VALUES ("тест1","тест2","тест3","тест4","тест5");
 
 INSERT INTO route(dep_airport,arrive_airport)
VALUES ('тест1','тест2');



 INSERT INTO avia_company(name_company, country_location)
VALUES  ('SkyTeam','Англія'),
        ('OneWorld','Англія'),
        ('SkyTeam','Україна'),
        ('Wizz Air','Чехія');

INSERT INTO address_head_office(address, phone_head_office, avia_company_id)
VALUES('6/7 Kensington','+420961923187',1),
('London, W8 4QP','+760971423281',2),
('м. Київ вул. Саксаганского','+380968923011',3),
('Kelz 22/44','+650875423254',4);