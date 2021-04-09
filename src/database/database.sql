CREATE DATABASE airlines

/*psql \! chcp 1251*/

CREATE TABLE flight(
    flight_id SERIAL,
    flight_num integer,
    dep_date timestamp,
    route_id integer,
    plane_id integer,
    add_luggage float,
    terminal_id integer,
    runaway varchar(255),
    flight_status varchar(255),
    PRIMARY KEY (flight_num, dep_date),
    FOREIGN KEY(route_id) 
	  REFERENCES route(route_id),
    FOREIGN KEY(plane_id) 
	  REFERENCES plane(plane_id),
    FOREIGN KEY(terminal_id) 
	  REFERENCES terminal(terminal_id),
);
CREATE TABLE route(
    route_id SERIAL,
    dep_airport varchar(255),
    arrive_airport varchar(255),
    dep_country varchar(255),
    arrive_country varchar(255),
    route_status varchar(255),
    PRIMARY KEY (dep_airport, arrive_airport)
);
CREATE TABLE terminal(
    terminal_id SERIAL,
    name_terminal varchar(255),
    gate varchar(255),
    PRIMARY KEY (name_terminal,gate)
);
CREATE TABLE plane(
    plane_id SERIAL,
    board_code varchar(255),
    name_plane varchar(255),
    model varchar(255),
    seats_count integer,
    flight_range(km) integer,
    crew_num integer,
    plane_condition varchar(255),
    PRIMARY KEY (name_plane,model,board_code),
    FOREIGN KEY(board_code) 
	  REFERENCES board_number(board_code),
    FOREIGN KEY(crew_num) 
	  REFERENCES crew(crew_num)

);
CREATE TABLE board_number(
   board_code varchar(255),
   aviacompany_name varchar(255),
    PRIMARY KEY (board_code)
);
CREATE TABLE crew(
    crew_num integer,
    staff_id integer,
    PRIMARY KEY (crew_num,staff_id),
    FOREIGN KEY(staff_id) 
	  REFERENCES staff(staff_id)
);
CREATE TABLE service_crew(
    service_crew_code integer,
    staff_id integer,   
    PRIMARY KEY (service_crew_code,staff_id),
    FOREIGN KEY(staff_id) 
	  REFERENCES staff(staff_id)
);
CREATE TABLE staff(
    staff_id serial,
   fullname_staff varchar(255),
   work_position varchar(255),
   crew_num integer,
   service_crew_num integer,
   flight_hours integer,
    PRIMARY KEY (fullname_staff,work_position),
    FOREIGN KEY(crew_num) 
	  REFERENCES crew(crew_num),
    FOREIGN KEY(service_crew_num) 
	  REFERENCES service_crew(service_crew_num)
);
CREATE TABLE plane_maintenance(
   event_date timestamp,
   service_crew_num integer,
   board_code varchar(255),
   result varchar(255),
    PRIMARY KEY (event_date,board_num),
    FOREIGN KEY(service_crew_num) 
	  REFERENCES service_crew(service_crew_num),
    FOREIGN KEY(board_code) 
	  REFERENCES board_number(board_code)
);
CREATE TABLE passenger(
    fullname_passenger varchar(255),
    book_date timestamp,
    passport_number integer,
    phone_number varchar(255),
    luggage_id integer,
    ticket_num integer,
    visa varchar(255),
    PRIMARY KEY (fullname_passenger,book_date),
    FOREIGN KEY(luggage_id) 
	  REFERENCES lugagge(luggage_id),
    FOREIGN KEY(ticket_num) 
	  REFERENCES ticket(ticket_num),
);
CREATE TABLE lugagge(
    luggage_id serial,
    luggage_code varchar(255),
    weight(kg) float,
    PRIMARY KEY (luggage_code)
);
CREATE TABLE ticket(
   ticket_id serial,
   ticket_num integer,
   seat_num integer,
   cost(ua) float,
   class varchar(255),
   transfer_id integer,
   ticket_status varchar(255)
    PRIMARY KEY (ticket_num,seat_num),
    FOREIGN KEY(transfer_id) 
	  REFERENCES transfer(transfer_id)
);
CREATE TABLE transfer(
    transfer_id integer,
    flight_id integer,   
    PRIMARY KEY (transfer_id,flight_id),
    FOREIGN KEY(flight_id) 
	  REFERENCES flight(flight_id)
);
CREATE TABLE avia_company(
   name_company varchar(255),
   country_location varchar(255),
   adress_id integer,
   PRIMARY KEY (name_company,country_location),
    FOREIGN KEY(adress_id) 
	  REFERENCES address_head_office(adress_id)
);
CREATE TABLE address_head_office(
   address_id serial,
   address varchar(255),
   phone_head_office varchar(255),
    PRIMARY KEY (adress_id)
);


INSERT INTO race(id, route)
VALUES (1,2);