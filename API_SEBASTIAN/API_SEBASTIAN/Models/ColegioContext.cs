using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace API_SEBASTIAN.Models;

public partial class ColegioContext : DbContext
{
    public ColegioContext()
    {
    }

    public ColegioContext(DbContextOptions<ColegioContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Asignatura> Asignaturas { get; set; }

    public virtual DbSet<Calificaciones> Calificaciones { get; set; }

    public virtual DbSet<Curso> Cursos { get; set; }

    public virtual DbSet<Estudiante> Estudiantes { get; set; }

    public virtual DbSet<Profesor> Profesores { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Asignatura>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Asignatu__3214EC0705EBAE16");

            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Calificaciones>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Califica__3214EC075E437B5D");

            entity.HasOne(d => d.AsignaturaNavigation).WithMany()
                .HasForeignKey(d => d.Asignatura)
                .HasConstraintName("FK_Calificaciones_Asignatura");

            entity.HasOne(d => d.EstudianteNavigation).WithMany()
                .HasForeignKey(d => d.Estudiante)
                .HasConstraintName("FK_Calificaciones_Estudiante")
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Curso>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Cursos__3214EC074BB32D30");

            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Estudiante>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Estudiantes__3214EC075DB14966");

            entity.Property(e => e.Apellidos)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.Nombres)
                .HasMaxLength(30)
                .IsUnicode(false);

            entity.HasOne(d => d.CursoNavigation)
                 .WithMany()
                 .HasForeignKey(d => d.Curso)
                 .HasConstraintName("FK_Estudiantes_Curso");
        });


        modelBuilder.Entity<Profesor>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Profesor__3214EC0708AED1C1");

            entity.Property(e => e.Apellidos)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.Nombres)
                .HasMaxLength(30)
                .IsUnicode(false);

            entity.HasOne(d => d.CursoNavigation).WithMany(p => p.DirectorCurso)
                .HasForeignKey(d => d.DirectorCurso)
                .HasConstraintName("FK_Profesores_Curso");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
