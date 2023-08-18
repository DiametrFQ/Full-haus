create table client
(
    id           serial
        primary key,
    name         varchar(64)       not null,
    friend_count integer default 0 not null
);

alter table client
    owner to postgres;

grant select, update, usage on sequence client_id_seq to anon;

grant select, update, usage on sequence client_id_seq to authenticated;

grant select, update, usage on sequence client_id_seq to service_role;

grant delete, insert, references, select, trigger, truncate, update on client to anon;

grant delete, insert, references, select, trigger, truncate, update on client to authenticated;

grant delete, insert, references, select, trigger, truncate, update on client to service_role;

create table friend
(
    client_id integer not null
        references client,
    friend_id integer not null
        references client
);

alter table friend
    owner to postgres;

grant delete, insert, references, select, trigger, truncate, update on friend to anon;

grant delete, insert, references, select, trigger, truncate, update on friend to authenticated;

grant delete, insert, references, select, trigger, truncate, update on friend to service_role;

create table chat
(
    id         bigserial
        primary key,
    id_creator integer not null
        references client,
    _id_users  integer[] default '{}'::integer[],
    _messages  text[]    default '{}'::text[]
);

alter table chat
    owner to postgres;

grant select, update, usage on sequence chat_id_seq to anon;

grant select, update, usage on sequence chat_id_seq to authenticated;

grant select, update, usage on sequence chat_id_seq to service_role;

grant delete, insert, references, select, trigger, truncate, update on chat to anon;

grant delete, insert, references, select, trigger, truncate, update on chat to authenticated;

grant delete, insert, references, select, trigger, truncate, update on chat to service_role;

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

grant execute on function plus_friend_count() to anon;

grant execute on function plus_friend_count() to authenticated;

grant execute on function plus_friend_count() to service_role;

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

grant execute on function create_friend_link(integer, integer) to anon;

grant execute on function create_friend_link(integer, integer) to authenticated;

grant execute on function create_friend_link(integer, integer) to service_role;

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

grant execute on function minus_friend_count() to anon;

grant execute on function minus_friend_count() to authenticated;

grant execute on function minus_friend_count() to service_role;

create or replace function creator_in_chat() returns trigger
    language plpgsql
as
$$
    BEGIN
        UPDATE chat set _id_users = Array[new.id_creator]::integer[]
                    where (new._id_users = Array[]::integer[] or new._id_users = '{}')and id_creator = new.id_creator;
        RETURN NEW;
    END;
$$;

alter function creator_in_chat() owner to postgres;

create trigger creator_in_chat
    after insert
    on chat
    for each row
execute procedure creator_in_chat();

grant execute on function creator_in_chat() to anon;

grant execute on function creator_in_chat() to authenticated;

grant execute on function creator_in_chat() to service_role;

create or replace function write_message(id_client integer, new_message text) returns void
    language plpgsql
as
$$

    BEGIN

        UPDATE chat set _messages = ARRAY_APPEND(_messages , ( id_client || ' ' || new_message ));

    END;

$$;

alter function write_message(integer, text) owner to postgres;

grant execute on function write_message(integer, text) to anon;

grant execute on function write_message(integer, text) to authenticated;

grant execute on function write_message(integer, text) to service_role;


