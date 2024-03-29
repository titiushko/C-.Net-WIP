GO

USE [master]
GO

IF EXISTS(SELECT * FROM SYS.DATABASES WHERE NAME='ProjectFollowing')
BEGIN
	EXEC msdb.dbo.sp_delete_database_backuphistory @database_name = N'ProjectFollowing';
	ALTER DATABASE [ProjectFollowing] SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
	DROP DATABASE [ProjectFollowing];
END;
GO

CREATE DATABASE [ProjectFollowing];
GO

/* ******************************************************************************** */

USE [ProjectFollowing]
GO

/* ******************************************************************************** */

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[AspNetUsers] (
	[Id] [nvarchar] (128) NOT NULL,
	[Email] [nvarchar] (256) NULL,
	[EmailConfirmed] [bit] NOT NULL,
	[PasswordHash] [nvarchar] (max) NULL,
	[SecurityStamp] [nvarchar] (max) NULL,
	[PhoneNumber] [nvarchar] (max) NULL,
	[PhoneNumberConfirmed] [bit] NOT NULL,
	[TwoFactorEnabled] [bit] NOT NULL,
	[LockoutEndDateUtc] [datetime] NULL,
	[LockoutEnabled] [bit] NOT NULL,
	[AccessFailedCount] [int] NOT NULL,
	[UserName] [nvarchar] (256) NOT NULL,
	[FirstName] [nvarchar] (256) NOT NULL,
	[LastName] [nvarchar] (256) NOT NULL,
	[CreateDate] [datetime] NOT NULL,
	[LastLoginDate] [datetime] NOT NULL,
	[LastPasswordChangedDate] [datetime] NOT NULL,
	[LinkedinId] varchar(50) NULL,
	[LawFirm] [nvarchar] (256) NULL,
	[TermsOfUse] [bit] NULL,
	CONSTRAINT [PK_dbo.AspNetUsers] PRIMARY KEY CLUSTERED ([Id] ASC) WITH (
		PAD_INDEX = OFF,
		STATISTICS_NORECOMPUTE = OFF,
		IGNORE_DUP_KEY = OFF,
		ALLOW_ROW_LOCKS = ON,
		ALLOW_PAGE_LOCKS = ON
	) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

CREATE UNIQUE NONCLUSTERED INDEX [AspNetUsers_UserName_Index] ON [dbo].[AspNetUsers] ([UserName] ASC) WITH (
	PAD_INDEX = OFF,
	STATISTICS_NORECOMPUTE = OFF,
	IGNORE_DUP_KEY = OFF,
	ALLOW_ROW_LOCKS = ON,
	ALLOW_PAGE_LOCKS = ON
) ON [PRIMARY]
GO

SET ANSI_PADDING OFF
GO

/* ******************************************************************************** */

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[AspNetRoles] (
	[Id] [nvarchar] (128) NOT NULL,
	[Name] [nvarchar] (256) NOT NULL,
	CONSTRAINT [PK_dbo.AspNetRoles] PRIMARY KEY CLUSTERED ([Id] ASC) WITH (
		PAD_INDEX = OFF,
		STATISTICS_NORECOMPUTE = OFF,
		IGNORE_DUP_KEY = OFF,
		ALLOW_ROW_LOCKS = ON,
		ALLOW_PAGE_LOCKS = ON
	) ON [PRIMARY]
) ON [PRIMARY]
GO

SET ANSI_PADDING OFF
GO

/* ******************************************************************************** */

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[AspNetUserClaims] (
	[Id] [int] IDENTITY(1, 1) NOT NULL,
	[UserId] [nvarchar] (128) NOT NULL,
	[ClaimType] [nvarchar] (max) NULL,
	[ClaimValue] [nvarchar] (max) NULL,
	CONSTRAINT [PK_dbo.AspNetUserClaims] PRIMARY KEY CLUSTERED ([Id] ASC) WITH (
		PAD_INDEX = OFF,
		STATISTICS_NORECOMPUTE = OFF,
		IGNORE_DUP_KEY = OFF,
		ALLOW_ROW_LOCKS = ON,
		ALLOW_PAGE_LOCKS = ON
	) ON [PRIMARY],
	CONSTRAINT [FK_dbo.AspNetUserClaims_dbo.AspNetUsers_UserId] FOREIGN KEY([UserId]) REFERENCES [dbo].[AspNetUsers] ([Id]) ON DELETE CASCADE
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

SET ANSI_PADDING OFF
GO

/* ******************************************************************************** */

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[AspNetUserLogins] (
	[LoginProvider] [nvarchar] (128) NOT NULL,
	[ProviderKey] [nvarchar] (128) NOT NULL,
	[UserId] [nvarchar] (128) NOT NULL,
	CONSTRAINT [PK_dbo.AspNetUserLogins] PRIMARY KEY CLUSTERED ([LoginProvider] ASC, [ProviderKey] ASC, [UserId] ASC) WITH (
		PAD_INDEX = OFF,
		STATISTICS_NORECOMPUTE = OFF,
		IGNORE_DUP_KEY = OFF,
		ALLOW_ROW_LOCKS = ON,
		ALLOW_PAGE_LOCKS = ON
	) ON [PRIMARY],
	CONSTRAINT [FK_dbo.AspNetUserLogins_dbo.AspNetUsers_UserId] FOREIGN KEY([UserId]) REFERENCES [dbo].[AspNetUsers] ([Id]) ON DELETE CASCADE
) ON [PRIMARY]
GO

SET ANSI_PADDING OFF
GO

/* ******************************************************************************** */

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[AspNetUserRoles] (
	[UserId] [nvarchar] (128) NOT NULL,
	[RoleId] [nvarchar] (128) NOT NULL,
	CONSTRAINT [PK_dbo.AspNetUserRoles] PRIMARY KEY CLUSTERED ([UserId] ASC, [RoleId] ASC) WITH (
		PAD_INDEX = OFF,
		STATISTICS_NORECOMPUTE = OFF,
		IGNORE_DUP_KEY = OFF,
		ALLOW_ROW_LOCKS = ON,
		ALLOW_PAGE_LOCKS = ON
	) ON [PRIMARY],
	CONSTRAINT [FK_dbo.AspNetUserRoles_dbo.AspNetRoles_RoleId] FOREIGN KEY([RoleId]) REFERENCES [dbo].[AspNetRoles] ([Id]) ON DELETE CASCADE,
	CONSTRAINT [FK_dbo.AspNetUserRoles_dbo.AspNetUsers_UserId] FOREIGN KEY([UserId]) REFERENCES [dbo].[AspNetUsers] ([Id]) ON DELETE CASCADE
) ON [PRIMARY]
GO

SET ANSI_PADDING OFF
GO

/* ******************************************************************************** */

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[TitiushkoProject](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](150) NOT NULL,
	[Description] [varchar](256) NULL,
	[DateCreated] [datetime] NOT NULL,
	[UserCreated] [nvarchar](256) NOT NULL,
	[DateModified] [datetime] NOT NULL,
	[UserModified] [nvarchar](256) NOT NULL,
	[UserId] [nvarchar](128) NOT NULL,
	CONSTRAINT [PK_Project] PRIMARY KEY CLUSTERED ([Id] ASC) WITH (
		PAD_INDEX = OFF,
		STATISTICS_NORECOMPUTE = OFF,
		IGNORE_DUP_KEY = OFF,
		ALLOW_ROW_LOCKS = ON,
		ALLOW_PAGE_LOCKS = ON
	) ON [PRIMARY],
	CONSTRAINT [FK_Project_AspNetUsers] FOREIGN KEY([UserId]) REFERENCES [dbo].[AspNetUsers] ([Id])
) ON [PRIMARY]
GO

SET ANSI_PADDING OFF
GO

/* ******************************************************************************** */

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[TitiushkoStatus](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](150) NOT NULL,
	[Description] [varchar](256) NULL,
	[DateCreated] [datetime] NOT NULL,
	[UserCreated] [nvarchar](256) NOT NULL,
	[DateModified] [datetime] NOT NULL,
	[UserModified] [nvarchar](256) NOT NULL,
	CONSTRAINT [PK_Status] PRIMARY KEY CLUSTERED ([Id] ASC) WITH (
		PAD_INDEX = OFF,
		STATISTICS_NORECOMPUTE = OFF,
		IGNORE_DUP_KEY = OFF,
		ALLOW_ROW_LOCKS = ON,
		ALLOW_PAGE_LOCKS = ON
	) ON [PRIMARY]
) ON [PRIMARY]
GO

SET ANSI_PADDING OFF
GO

/* ******************************************************************************** */

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[TitiushkoSprint](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](150) NOT NULL,
	[Description] [varchar](256) NULL,
	[StartDate] [date] NOT NULL,
	[EndDate] [date] NOT NULL,
	[ProjectId] [int] NOT NULL,
	[StatusId] [int] NULL,
	[DateCreated] [datetime] NOT NULL,
	[UserCreated] [nvarchar](256) NOT NULL,
	[DateModified] [datetime] NOT NULL,
	[UserModified] [nvarchar](256) NOT NULL,
	CONSTRAINT [PK_Sprint] PRIMARY KEY CLUSTERED ([Id] ASC) WITH (
		PAD_INDEX = OFF,
		STATISTICS_NORECOMPUTE = OFF,
		IGNORE_DUP_KEY = OFF,
		ALLOW_ROW_LOCKS = ON,
		ALLOW_PAGE_LOCKS = ON
	) ON [PRIMARY],
	CONSTRAINT [FK_Sprint_Project] FOREIGN KEY([ProjectId]) REFERENCES [dbo].[TitiushkoProject] ([Id]),
	CONSTRAINT [FK_Sprint_Status] FOREIGN KEY([StatusId]) REFERENCES [dbo].[TitiushkoStatus] ([Id])
) ON [PRIMARY]
GO

SET ANSI_PADDING OFF
GO

/* ******************************************************************************** */

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[TitiushkoTaskType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](150) NOT NULL,
	[Description] [varchar](256) NULL,
	[DateCreated] [datetime] NOT NULL,
	[UserCreated] [nvarchar](256) NOT NULL,
	[DateModified] [datetime] NOT NULL,
	[UserModified] [nvarchar](256) NOT NULL,
	CONSTRAINT [PK_TaskType] PRIMARY KEY CLUSTERED ([Id] ASC) WITH (
		PAD_INDEX = OFF,
		STATISTICS_NORECOMPUTE = OFF,
		IGNORE_DUP_KEY = OFF,
		ALLOW_ROW_LOCKS = ON,
		ALLOW_PAGE_LOCKS = ON
	) ON [PRIMARY]
) ON [PRIMARY]
GO

SET ANSI_PADDING OFF
GO

/* ******************************************************************************** */

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[TitiushkoTask](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](150) NOT NULL,
	[Description] [varchar](256) NULL,
	[EstimatedHours] [int] NULL,
	[WorkedHours] [int] NULL,
	--[RemainingHours] [int] NULL,
	[ProjectId] [int] NULL,
	[SprintId] [int] NULL,
	[StatusId] [int] NULL,
	[TaskTypeId] [int] NULL,
	[DateCreated] [datetime] NOT NULL,
	[UserCreated] [nvarchar](256) NOT NULL,
	[DateModified] [datetime] NOT NULL,
	[UserModified] [nvarchar](256) NOT NULL,
	CONSTRAINT [PK_Task] PRIMARY KEY CLUSTERED ([Id] ASC) WITH (
		PAD_INDEX = OFF,
		STATISTICS_NORECOMPUTE = OFF,
		IGNORE_DUP_KEY = OFF,
		ALLOW_ROW_LOCKS = ON,
		ALLOW_PAGE_LOCKS = ON
	) ON [PRIMARY],
	CONSTRAINT [FK_Task_Project] FOREIGN KEY([ProjectId]) REFERENCES [dbo].[TitiushkoProject] ([Id]),
	CONSTRAINT [FK_Task_Sprint] FOREIGN KEY([SprintId]) REFERENCES [dbo].[TitiushkoSprint] ([Id]),
	CONSTRAINT [FK_Task_Status] FOREIGN KEY([StatusId]) REFERENCES [dbo].[TitiushkoStatus] ([Id]),
	CONSTRAINT [FK_Task_TaskType] FOREIGN KEY([TaskTypeId]) REFERENCES [dbo].[TitiushkoTaskType] ([Id])
) ON [PRIMARY]
GO

SET ANSI_PADDING OFF
GO

/* ******************************************************************************** */

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[TitiushkoAssignments](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [nvarchar](128) NOT NULL,
	[TaskId] [int] NOT NULL,
	[DateCreated] [datetime] NOT NULL,
	[UserCreated] [nvarchar](256) NOT NULL,
	[DateModified] [datetime] NOT NULL,
	[UserModified] [nvarchar](256) NOT NULL,
	CONSTRAINT [PK_Assignments] PRIMARY KEY CLUSTERED ([Id] ASC) WITH (
		PAD_INDEX = OFF,
		STATISTICS_NORECOMPUTE = OFF,
		IGNORE_DUP_KEY = OFF,
		ALLOW_ROW_LOCKS = ON,
		ALLOW_PAGE_LOCKS = ON
	) ON [PRIMARY],
	CONSTRAINT [FK_Assignments_AspNetUsers] FOREIGN KEY([UserId]) REFERENCES [dbo].[AspNetUsers] ([Id]),
	CONSTRAINT [FK_Assignments_Task] FOREIGN KEY([TaskId]) REFERENCES [dbo].[TitiushkoTask] ([Id])
) ON [PRIMARY]
GO

SET ANSI_PADDING OFF
GO

GO
