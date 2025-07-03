create table "public"."Sales" (
    "products" text not null,
    "amount" bigint not null,
    "region" text
);


alter table "public"."Sales" enable row level security;

CREATE UNIQUE INDEX "Sales_pkey" ON public."Sales" USING btree (products);

alter table "public"."Sales" add constraint "Sales_pkey" PRIMARY KEY using index "Sales_pkey";

grant delete on table "public"."Sales" to "anon";

grant insert on table "public"."Sales" to "anon";

grant references on table "public"."Sales" to "anon";

grant select on table "public"."Sales" to "anon";

grant trigger on table "public"."Sales" to "anon";

grant truncate on table "public"."Sales" to "anon";

grant update on table "public"."Sales" to "anon";

grant delete on table "public"."Sales" to "authenticated";

grant insert on table "public"."Sales" to "authenticated";

grant references on table "public"."Sales" to "authenticated";

grant select on table "public"."Sales" to "authenticated";

grant trigger on table "public"."Sales" to "authenticated";

grant truncate on table "public"."Sales" to "authenticated";

grant update on table "public"."Sales" to "authenticated";

grant delete on table "public"."Sales" to "service_role";

grant insert on table "public"."Sales" to "service_role";

grant references on table "public"."Sales" to "service_role";

grant select on table "public"."Sales" to "service_role";

grant trigger on table "public"."Sales" to "service_role";

grant truncate on table "public"."Sales" to "service_role";

grant update on table "public"."Sales" to "service_role";


