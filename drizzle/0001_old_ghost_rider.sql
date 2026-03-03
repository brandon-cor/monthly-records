CREATE TABLE "apple_music_token" (
	"user_id" text PRIMARY KEY NOT NULL,
	"music_user_token" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "apple_music_token" ADD CONSTRAINT "apple_music_token_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;