"""Update description

Revision ID: c5a8219cf305
Revises: 49bffe0094ec
Create Date: 2023-06-30 18:12:03.557416

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c5a8219cf305'
down_revision = '49bffe0094ec'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('names', sa.String(length=120), nullable=False))
        batch_op.alter_column('password',
               existing_type=sa.VARCHAR(length=80),
               type_=sa.String(length=220),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('password',
               existing_type=sa.String(length=220),
               type_=sa.VARCHAR(length=80),
               existing_nullable=False)
        batch_op.drop_column('names')

    # ### end Alembic commands ###
