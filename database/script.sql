create table client
(
    id           serial
        primary key,
    name         varchar(64)       not null,
    friend_count integer default 0 not null
);

alter table client
    owner to postgres;

create table friend
(
    client_id integer not null
        references client,
    friend_id integer not null
        references client
);

alter table friend
    owner to postgres;

create or replace function plus_friend_count() returns trigger
    language plpgsql
as
$$
    BEGIN
        UPDATE client set friend_count = friend_count+1 where id = NEW.client_id OR id = NEW.friend_id;
        RETURN NEW;
    END;
$$;

alter function plus_friend_count() owner to postgres;

create trigger plus_friend_count
    before insert
    on friend
    for each row
execute procedure plus_friend_count();

create or replace function create_friend_link(id_client integer, id_another integer) returns void
    language plpgsql
as
$$
    DECLARE
        id_found_friend integer;
    BEGIN

        select friend_id into id_found_friend from friend where client_id = id_client;

        IF id_another = id_found_friend THEN
            RETURN;

        ELSE
            insert into friend (client_id, friend_id)
                values ( id_client, id_another );

        END IF;

    END;
$$;

alter function create_friend_link(integer, integer) owner to postgres;

create or replace function minus_friend_count() returns trigger
    language plpgsql
as
$$
    BEGIN
        UPDATE client set friend_count = friend_count-1 where id = old.client_id OR id = old.friend_id;
        RETURN old;
    END;
$$;

alter function minus_friend_count() owner to postgres;

create trigger minus_friend_count
    before delete
    on friend
    for each row
execute procedure minus_friend_count();


