CREATE TABLE IF NOT EXISTS "favorite" (
	"userId" text NOT NULL,
	"symbol" text NOT NULL,
	CONSTRAINT "favorite_userId_symbol_pk" PRIMARY KEY("userId","symbol")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "favorite" ADD CONSTRAINT "favorite_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
